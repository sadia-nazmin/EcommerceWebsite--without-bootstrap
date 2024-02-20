import { Component, OnDestroy, OnInit } from '@angular/core';
import { BasketService } from './basket.service';
import { Basket, BasketItem } from '../shared/models/basket';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss'],
})
export class BasketComponent implements OnInit {
  displayedColumns: string[] = [
    'product',
    'price',
    'quantity',
    'total',
    'delete',
  ];

  dataSource: Basket | null = null;
  basketValue: BasketItem[] | null = null;

  constructor(private basketService: BasketService) {}

  ngOnInit(): void {
    this.basketService.basketSource$.subscribe({
      next: (res) => {
        this.dataSource = res;
        this.basketValue = this.dataSource && this.dataSource.items;
      },
    });
  }

  addQuantity(item: BasketItem) {
    this.basketService.addItemToBasket(item);
    this.dataSource = this.basketService.getCurrentBasketValue();
    this.basketValue = this.dataSource && this.dataSource.items;
  }

  removeQuantityAndItem(id: number, quantity: number) {
    this.basketService.removeItemFromBasket(id, quantity);
    this.dataSource = this.basketService.getCurrentBasketValue();
    this.basketValue = this.dataSource && this.dataSource.items;
  }
}
