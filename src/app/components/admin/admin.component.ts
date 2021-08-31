import { Component, OnInit } from '@angular/core';
import { IBooking } from 'src/app/models/booking';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  bookedBookings: IBooking[];

  constructor(
    public firebaseService: FirebaseService
  ) { }

  ngOnInit(): void {
    this.firebaseService.getAllReservedOrBookedBookings().subscribe({
      next: (res) => {
        console.log('booked', res);
        this.bookedBookings = res;
      }
    })
  }

  onFillBookings() {
    this.firebaseService.fillBookings(new Date(2021, 7, 30));
  }

}
