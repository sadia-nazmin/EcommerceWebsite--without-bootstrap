import { Component } from '@angular/core';
import {
  AbstractControl,
  AsyncValidatorFn,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { AccountService } from '../account.service';
import { Router } from '@angular/router';
import { debounceTime, finalize, map, switchMap, take } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent {
  hide = true;
  strongPassword =
    "(?=^.{6,10}$)(?=.*d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,])(?!.*s).*$";

  constructor(
    private fb: FormBuilder,
    private accountService: AccountService,
    private router: Router
  ) {}

  signupForm = this.fb.group({
    displayName: ['', Validators.required],
    email: [
      '',
      [Validators.required, Validators.email],
      [this.validEmailNotTaken()],
    ],
    password: [
      '',
      [Validators.required, Validators.pattern(this.strongPassword)],
    ],
  });

  onSubmit() {
    this.accountService.signup(this.signupForm.value).subscribe({
      next: () => this.router.navigateByUrl('/shop'),
    });
  }

  validEmailNotTaken(): AsyncValidatorFn {
    return (control: AbstractControl) => {
      return control.valueChanges.pipe(
        debounceTime(500),
        take(1),
        switchMap(() => {
          return this.accountService.checkEmailExists(control.value).pipe(
            map((result) => (result ? { emailExists: true } : null)),
            finalize(() => control.markAsTouched())
          );
        })
      );
    };
  }
}
