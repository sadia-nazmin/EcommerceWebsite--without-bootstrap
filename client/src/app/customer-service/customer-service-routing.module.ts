import { NgModule } from '@angular/core';
import { CustomerServiceComponent } from './customer-service.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{ path: '', component: CustomerServiceComponent }];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomerServiceRoutingModule {}
