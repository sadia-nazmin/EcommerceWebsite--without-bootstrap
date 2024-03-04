import { Component, OnDestroy, OnInit } from '@angular/core';
import { BasketService } from './basket.service';
import { Basket, BasketItem } from '../shared/models/basket';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss'],
})
export class BasketComponent {
  constructor(public basketService: BasketService) {}

  addQuantity(item: BasketItem) {
    this.basketService.addItemToBasket(item);
  }

  removeQuantityAndItem(event: { id: number; quantity: number }) {
    this.basketService.removeItemFromBasket(event.id, event.quantity);
  }
}
