import { Component, OnInit } from '@angular/core';
import { IPeriod } from 'src/app/models/booking';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  availablePeriods: IPeriod[];
  bookedPeriods: IPeriod[];

  constructor(
    public firebaseService: FirebaseService
  ) { }

  ngOnInit(): void {
    this.firebaseService.getAllAvailablePeriods().subscribe({
      next: (res) => {
        console.log('available', res);
        this.availablePeriods = res;
      }
    });
    this.firebaseService.getAllReservedOrBookedPeriods().subscribe({
      next: (res) => {
        console.log('booked', res);
        this.bookedPeriods = res;
      }
    })
  }

  onFillPeriods() {
    this.firebaseService.fillPeriods(new Date());
  }

}
