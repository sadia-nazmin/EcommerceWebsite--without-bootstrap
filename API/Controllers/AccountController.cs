using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using API.DTOs;
using API.Errors;
using API.Extensions;
using AutoMapper;
using Core.Entities.Identity;
using Core.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class AccountController : BaseApiController
    {
        private readonly SignInManager<AppUser> _signInManager;
        private readonly UserManager<AppUser> _userManager;
        private readonly ITokenService _tokenService;
        private readonly IMapper _mapper;

        public AccountController(UserManager<AppUser> userManager,
         SignInManager<AppUser> signInManager,
         ITokenService tokenService,
         IMapper mapper)
        {
            _tokenService = tokenService;
            _userManager = userManager;
            _signInManager = signInManager;
            _mapper = mapper;
        }

        [Authorize]
        [HttpGet]
        public async Task<ActionResult<UserDto>> GetCurrentUser()
        {
            var email = User.FindFirstValue(ClaimTypes.Email);

            var user = await _userManager.FindByEmailAsync(email);

            return new UserDto 
            {
                Email = user.Email,
                Token = _tokenService.CreateToken(user),
                DisplayName = user.DisplayName
            };
        }

        [HttpGet("emailexists")]
        public async Task<ActionResult<bool>> CheckEmailExistsAsync(string email)
        {
            var result = await _userManager.FindByEmailAsync(email) != null;

            return result;
        }

        [Authorize]
        [HttpGet("address")]
        public async Task<ActionResult<AddressDto>> GetUserAddress()
        {
            var user = await _userManager.FindUserByClaimsPrincipleWithAddress(User);

            return _mapper.Map<Address,AddressDto>(user.Address);

        }

        [Authorize]
        [HttpPut("address")]
        public async Task<ActionResult<AddressDto>> UpdateAddress(AddressDto addressDto)
        {
            var user = await _userManager.FindUserByClaimsPrincipleWithAddress(User);

            user.Address = _mapper.Map<AddressDto,Address>(addressDto);

            var result = await _userManager.UpdateAsync(user);
            
            if(!result.Succeeded) return BadRequest("Problem updating the user");

            return Ok(_mapper.Map<Address,AddressDto>(user.Address)); 
        }
        
        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {
            var user = await _userManager.FindByEmailAsync(loginDto.Email);

            if(user == null) return Unauthorized(new ApiResponse(401));

            var result = await _signInManager.CheckPasswordSignInAsync(user, loginDto.Password,false);

            if(!result.Succeeded) return Unauthorized(new ApiResponse(401));

            return new UserDto 
            {
                Email = user.Email,
                Token = _tokenService.CreateToken(user),
                DisplayName = user.DisplayName
            };

        }

        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
        {
            if(CheckEmailExistsAsync(registerDto.Email).Result.Value)
            {
                return new BadRequestObjectResult(new ApiValidationErrorResponse{Errors = new []{"Email Address is in use"}});
            }

            var user = new AppUser
            {
                Email = registerDto.Email,
                DisplayName = registerDto.DisplayName,
                UserName = registerDto.Email,
            };

            var result = await _userManager.CreateAsync(user,registerDto.Password);
            if(!result.Succeeded) return BadRequest(new ApiResponse(400));

            return new UserDto 
            {
                DisplayName = user.DisplayName,
                Token = _tokenService.CreateToken(user),
                Email = user.Email
            };
        }
    }
}