import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [NavBarComponent],
  imports: [CommonModule, MatIconModule, MatButtonModule],
  exports: [NavBarComponent],
})
export class CoreModule {}
