import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { NguCarousel, NguCarouselConfig } from '@ngu/carousel';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  data = [
    'assets/images/hero1.jpg',
    'assets/images/hero2.jpg',
    'assets/images/hero3.jpg',
  ];
  name = 'Angular';
  slideNo = 0;
  withAnim = true;
  resetAnim = true;

  @ViewChild('myCarousel')
  myCarousel!: NguCarousel<string>;
  carouselConfig: NguCarouselConfig = {
    grid: { xs: 1, sm: 1, md: 1, lg: 1, all: 0 },
    load: 3,
    interval: { timing: 3000, initialDelay: 3000 },
    loop: true,
    touch: true,
    velocity: 0.2,
  };

  moveTo(slide: any) {
    this.myCarousel.moveTo(slide, !this.withAnim);
  }
}
