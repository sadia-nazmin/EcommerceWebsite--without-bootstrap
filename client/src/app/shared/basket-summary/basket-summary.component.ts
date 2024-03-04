import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BasketService } from 'src/app/basket/basket.service';
import { Basket, BasketItem } from '../models/basket';

@Component({
  selector: 'app-basket-summary',
  templateUrl: './basket-summary.component.html',
  styleUrls: ['./basket-summary.component.scss'],
})
export class BasketSummaryComponent {
  @Output() addItem = new EventEmitter<BasketItem>();
  @Output() removeItem = new EventEmitter<{ id: number; quantity: number }>();
  @Input() isBasket = true;

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

  addBasketItem(item: BasketItem) {
    this.addItem.emit(item);
    this.dataSource = this.basketService.getCurrentBasketValue();
    this.basketValue = this.dataSource && this.dataSource.items;
  }

  removeBasketItem(id: number, quantity = 1) {
    this.removeItem.emit({ id, quantity });
    this.dataSource = this.basketService.getCurrentBasketValue();
    this.basketValue = this.dataSource && this.dataSource.items;
  }
}
