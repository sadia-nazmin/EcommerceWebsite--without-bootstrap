import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AccountService } from 'src/app/account/account.service';

export const authGuard: CanActivateFn = (route, state): Observable<boolean> => {
  const accountService: AccountService = inject(AccountService);
  const router: Router = inject(Router);

  return accountService.currentUser$.pipe(
    map((auth) => {
      if (auth) {
        return true;
      } else {
        router.navigate(['/account/login'], {
          queryParams: { returnUrl: state.url },
        });
        return false;
      }
    })
  );
};
