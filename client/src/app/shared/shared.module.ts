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
import { StepperComponent } from './stepper/stepper.component';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    PagingHeaderComponent,
    PagerComponent,
    OrderSummaryComponent,
    TextInputComponent,
    StepperComponent,
  ],
  imports: [
    CommonModule,
    MatPaginatorModule,
    MatDividerModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    CdkStepperModule,
  ],
  exports: [
    MatPaginatorModule,
    PagingHeaderComponent,
    PagerComponent,
    OrderSummaryComponent,
    ReactiveFormsModule,
    TextInputComponent,
    StepperComponent,
    CdkStepperModule,
  ],
})
export class SharedModule {}
