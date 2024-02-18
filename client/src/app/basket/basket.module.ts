import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasketComponent } from './basket.component';
import { BasketRoutingModule } from './basket-routing.module';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [BasketComponent],
  imports: [CommonModule, BasketRoutingModule, MatTableModule, MatIconModule],
})
export class BasketModule {}
