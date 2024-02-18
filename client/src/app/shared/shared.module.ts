import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatPaginatorModule } from '@angular/material/paginator';
import { PagingHeaderComponent } from './paging-header/paging-header.component';
import { PagerComponent } from './pager/pager.component';
import { OrderSummaryComponent } from './order-summary/order-summary.component';
import { MatDividerModule } from '@angular/material/divider';

@NgModule({
  declarations: [PagingHeaderComponent, PagerComponent, OrderSummaryComponent],
  imports: [CommonModule, MatPaginatorModule, MatDividerModule],
  exports: [
    MatPaginatorModule,
    PagingHeaderComponent,
    PagerComponent,
    OrderSummaryComponent,
  ],
})
export class SharedModule {}
