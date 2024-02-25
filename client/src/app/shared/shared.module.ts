import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatPaginatorModule } from '@angular/material/paginator';
import { PagingHeaderComponent } from './paging-header/paging-header.component';
import { PagerComponent } from './pager/pager.component';
import { OrderSummaryComponent } from './order-summary/order-summary.component';
import { MatDividerModule } from '@angular/material/divider';
import { ReactiveFormsModule } from '@angular/forms';
import { TextInputComponent } from './text-input/text-input.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [
    PagingHeaderComponent,
    PagerComponent,
    OrderSummaryComponent,
    TextInputComponent,
  ],
  imports: [
    CommonModule,
    MatPaginatorModule,
    MatDividerModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  exports: [
    MatPaginatorModule,
    PagingHeaderComponent,
    PagerComponent,
    OrderSummaryComponent,
    ReactiveFormsModule,
    TextInputComponent,
  ],
})
export class SharedModule {}
