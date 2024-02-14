import { Injectable } from '@angular/core';
import {
  MatProgressSpinner,
  MatProgressSpinnerDefaultOptions,
  MatProgressSpinnerModule,
} from '@angular/material/progress-spinner';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BusyService {
  busyRequestCount = 0;
  isLoaderNeeded = new BehaviorSubject<boolean>(false);
  isLoaderNeeded$ = this.isLoaderNeeded.asObservable();

  // constructor(private spinnerService: NgxSpinnerService) {}

  busy() {
    this.busyRequestCount++;
    this.isLoaderNeeded.next(true);
  }

  idle() {
    this.busyRequestCount--;

    if (this.busyRequestCount <= 0) {
      this.busyRequestCount = 0;
      this.isLoaderNeeded.next(false);
    }
  }
}
