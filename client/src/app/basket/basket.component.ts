import { Component } from '@angular/core';
import { BasketService } from './basket.service';
import { Basket, BasketItem } from '../shared/models/basket';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss'],
})
export class BasketComponent {
  displayedColumns: string[] = [
    'product',
    'price',
    'quantity',
    'total',
    'delete',
  ];

  dataSource = this.basketService.getCurrentBasketValue();
  basketValue = this.dataSource && this.dataSource.items;

  constructor(private basketService: BasketService) {}

  ngOnInit(): void {}

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
