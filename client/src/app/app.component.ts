import { Component, OnInit } from '@angular/core';
import { BusyService } from './core/services/busy.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'client';
  isLoading: boolean = true;

  constructor(public busyService: BusyService) {}

  ngOnInit(): void {
    this.busyService.isLoaderNeeded$.subscribe({
      next: (response) => (this.isLoading = response),
    });
  }
}
