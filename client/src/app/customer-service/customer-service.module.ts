import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerServiceComponent } from './customer-service.component';
import { CustomerServiceRoutingModule } from './customer-service-routing.module';

@NgModule({
  declarations: [CustomerServiceComponent],
  imports: [CommonModule, CustomerServiceRoutingModule],
})
export class CustomerServiceModule {}
