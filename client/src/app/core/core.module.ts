import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [NavBarComponent],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    RouterModule,
    MatProgressSpinnerModule,
  ],
  exports: [NavBarComponent, MatProgressSpinnerModule],
})
export class CoreModule {}
