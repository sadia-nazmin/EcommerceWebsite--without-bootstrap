import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { BusyService } from './core/services/busy.service';
import { BasketService } from './basket/basket.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from './account/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'client';
  isLoading: boolean = true;

  constructor(
    private busyService: BusyService,
    private basketService: BasketService,
    private cd: ChangeDetectorRef,
    private router: Router,
    private accountService: AccountService
  ) {}

  ngOnInit(): void {
    this.isLoaderNeeded();
    this.isBasketIdThere();
    this.loadCurrentUser();
  }

  isLoaderNeeded() {
    this.busyService.isLoaderNeeded$.subscribe({
      next: (response) => {
        this.isLoading = response;
        this.cd.detectChanges();
      },
    });
  }

  isBasketIdThere() {
    const basketId = localStorage.getItem('basket_id');
    if (basketId) {
      this.basketService.getBasket(basketId);
    }
  }

  isCustomerServiceRoute() {
    return this.router.url.includes('/customer-service');
  }

  loadCurrentUser() {
    const token = localStorage.getItem('token');
    this.accountService.loadCurrentUser(token).subscribe();
  }
}
