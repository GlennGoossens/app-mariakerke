import { FirebaseService } from 'src/app/services/firebase.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CalendarOptions, FullCalendarComponent } from '@fullcalendar/angular';
import { IBooking } from 'src/app/models/booking';
import { TranslateService } from '@ngx-translate/core';
import { Timestamp } from 'firebase/firestore';

@Component({
  selector: 'app-beschikbaarheid',
  templateUrl: './beschikbaarheid.component.html',
  styleUrls: ['./beschikbaarheid.component.css']
})
export class BeschikbaarheidComponent implements OnInit {

  calendarOptions: CalendarOptions;

  events: any[] = [];
  @ViewChild('calendar') calendarComponent: FullCalendarComponent;


  constructor(
    private router: Router,
    private translateService:TranslateService,
    private firebaseService: FirebaseService
  ) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.firebaseService.getAllReservedOrBookedBookings().subscribe({
        next: (res) => {
          this.fillCalenderEvents(res);
        }
      })
    }, 100);
    setTimeout(() => {
      this.calendarOptions = {
        firstDay: 1,
        height: 'auto',
        initialView: 'dayGridMonth',
        events: this.events,
        displayEventTime: false
      };
    }, 2000);

  }

  fillCalenderEvents(bookings: IBooking[]) {
    bookings.forEach((item: IBooking) => {
      this.events.push({ title: this.translateService.instant('app.booked'), start: (item.startDate as Timestamp).toDate(), end: (item.endDate as Timestamp).toDate() });
    });
  }

  onNavigateToBook() {
    this.router.navigate(['/book'])
  }

}
