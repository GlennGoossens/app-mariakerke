import { MailService } from './../../services/mail.service';
import { Component, OnInit } from '@angular/core';
import { BookingStatus, IBooking } from 'src/app/models/booking';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Timestamp } from 'firebase/firestore';

class DataTablesResponse {
  data: any[];
  draw: number;
  recordsFiltered: number;
  recordsTotal: number;
}

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  dtBookedOptions: DataTables.Settings = {};
  dtReservedOptions: DataTables.Settings = {};

  bookedBookings: IBooking[];
  reservedBookings: IBooking[];

  constructor(
    public firebaseService: FirebaseService,
    public mailService: MailService
  ) {}

  ngOnInit(): void {
    const that = this;
    this.dtBookedOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      serverSide: true,
      processing: true,
      ajax: (dataTableParameters: any, callback) => {
        that.firebaseService.getAllReservedOrBookedBookings().subscribe({
          next: (res) => {
            that.bookedBookings = res;
            callback({
              recordsTotal: res.length,
              recordsFiltered: res.length,
              data: [],
            });
          },
        });
      },
    };

    this.dtReservedOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      serverSide: true,
      processing: true,
      ajax: (dataTableParameters: any, callback) => {
        that.firebaseService.getAllReservedBookings().subscribe({
          next: (res) => {
            that.reservedBookings = res;
            callback({
              recordsTotal: res.length,
              recordsFiltered: res.length,
              data: [],
            });
          },
        });
      },
    };
  }

  onFulfillPayment(booking: IBooking) {
    booking.status = BookingStatus.Booked;
    this.firebaseService.updateBooking(booking);
  }

  onClearBooking(booking: IBooking) {
    console.log('start clear bookings');
    const orgStartDate = booking.startDate.toDate();
    let dayDiff = Math.round(
      (booking.endDate.toDate().getTime() -
        booking.startDate.toDate().getTime()) /
        (1000 * 60 * 60 * 24)
    );
    if (dayDiff > 7) {
      dayDiff = dayDiff / 7 - 1;
      let newStartDate = new Date(booking.startDate.toDate());
      newStartDate.setDate(booking.startDate.toDate().getDate() + 7);
      newStartDate.setHours(newStartDate.getHours() + 12);
      let newEndDate = new Date(newStartDate);
      newEndDate.setDate(newEndDate.getDate() + 6);
      for (let i = 0; i < dayDiff; i++) {
        let newBooking: IBooking = {
          status: BookingStatus.Free,
          startDate: Timestamp.fromDate(newStartDate),
          endDate: Timestamp.fromDate(newEndDate),
        };
        this.firebaseService.createBooking(newBooking);
        newStartDate.setDate(newStartDate.getDate() + 7);
        newEndDate.setDate(newEndDate.getDate() + 7);
      }
      let updateEndDate = new Date(orgStartDate);
      updateEndDate.setDate(updateEndDate.getDate() + 6);
      updateEndDate.setHours(updateEndDate.getHours() + 12);
      booking.endDate = Timestamp.fromDate(updateEndDate);
    }
    booking.status = BookingStatus.Free;
    this.firebaseService.updateBooking(booking);
  }

  // TEST CODE
  onFillBookings() {
    this.firebaseService.fillBookings(new Date(2021, 7, 30));
  }

  onSendTestEmail() {
    var bookings: IBooking = {
      firstName: 'Glenn',
      startDate: Timestamp.fromDate(new Date(2020, 7, 30)),
      endDate: Timestamp.fromDate(new Date(2020, 8, 5)),
      reference: 'testRef',
      status: 2,
    };
    this.mailService.sendReservationBookedEmail(bookings);
  }
}
