import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { BusyService } from './core/services/busy.service';
import { BasketService } from './basket/basket.service';

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
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.isLoaderNeeded();
    this.isBasketIdThere();
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
}
