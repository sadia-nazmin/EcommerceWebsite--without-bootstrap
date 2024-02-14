import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { NguCarouselModule } from '@ngu/carousel';

@NgModule({
  declarations: [HomeComponent],
  imports: [CommonModule, NguCarouselModule],
  exports: [HomeComponent],
})
export class HomeModule {}
