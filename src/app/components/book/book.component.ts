import { Router } from '@angular/router';
import { FirebaseService } from './../../services/firebase.service';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CalendarOptions, FullCalendarComponent } from '@fullcalendar/angular';
import { BookingStatus, IBooking } from 'src/app/models/booking';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {

  form = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.email, Validators.required]),
    telephone: new FormControl('', Validators.required),
    bookings: new FormControl([], Validators.required)
  });

  calendarOptions: CalendarOptions;
  events: any[] = [];
  bookedEvents: any[] = [];

  @ViewChild('calendar') calendarComponent: FullCalendarComponent;


  constructor(
    private firebaseService: FirebaseService,
    private cd: ChangeDetectorRef,
    private router: Router
  ) { }

  ngOnInit(): void {
    window.scroll(0, 0);
    setTimeout(() => {
      this.firebaseService.getAllAvailableBookings().pipe(take(1)).subscribe({
        next: (res) => {
          this.fillCalenderEvents(res);
        }
      })
    }, 100);
    setTimeout(() => {
      this.updateCalendar();
    }, 1000);
  }

  updateCalendar() {
    this.calendarOptions = {
      firstDay: 1,
      height: 'auto',
      initialView: 'dayGridMonth',
      events: this.events,
      displayEventTime: false,
      eventClick: this.onSelectFreePeriod.bind(this)
    };
  }

  fillCalenderEvents(bookings: IBooking[]) {
    bookings.forEach((item: IBooking) => {
      this.events.push({
        id: item.key,
        title: 'Free',
        start: item.startDate.toDate(),
        end: item.endDate.toDate(),
        backgroundColor: 'lightblue'
      });
    });
  }

  bookPeriod(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
    var bookIndex = 0;
    this.bookedEvents.forEach((event) => {
      var booking: IBooking = {
        key: event.id,
        firstName: this.form.value.firstName,
        lastName: this.form.value.lastName,
        email: this.form.value.email,
        telephone: this.form.value.telephone,
        status: BookingStatus.Reserved,
        startDate: event.start,
        endDate: event.end,
        reference: this.generateReference()
      }
      this.firebaseService.updateBooking(booking).then((result) => {
        bookIndex++;
        if (bookIndex === this.bookedEvents.length) {
          window.alert("Booking successfull");
          this.router.navigate(['']);
        }
      }).catch((error) => window.alert("Booking Failed"));
    });
  }

  generateReference(): string {
    let text = "";
    let possible = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
    for (let i = 0; i < 10; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }

  infoToEventObject(info: any): any {
    return {
      id: info.event.id,
      title: info.event.title,
      start: info.event.start,
      end: info.event.end
    }
  }

  onSelectFreePeriod(info: any) {
    var tempEvents = this.events.slice();
    var eventObj = this.infoToEventObject(info);
    if (this.bookedEvents.find(e => e.id === eventObj.id) !== undefined) {
      let eventToFree = tempEvents.find(e => e.id === info.event.id);
      eventToFree.backgroundColor = 'lightblue';
      let index = tempEvents.findIndex(e => e.id === info.event.id);
      tempEvents[index] = eventToFree;
      let bookedEventIndex = this.bookedEvents.findIndex(e => e.id === info.event.id);
      this.bookedEvents.splice(bookedEventIndex, 1);
    } else {
      this.bookedEvents.push(eventObj);
      let eventToUpdate = tempEvents.find(e => e.id === info.event.id);
      let index = tempEvents.findIndex(e => e.id === info.event.id);
      eventToUpdate.backgroundColor = 'green';
      tempEvents[index] = eventToUpdate;
    }
    this.events = tempEvents.slice();
    this.form.controls.bookings.setValue(this.bookedEvents);
    this.cd.detectChanges();
    this.updateCalendar();
  }

}
