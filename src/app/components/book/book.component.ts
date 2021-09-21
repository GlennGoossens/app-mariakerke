import { MailService } from './../../services/mail.service';
import { Router } from '@angular/router';
import { FirebaseService } from './../../services/firebase.service';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CalendarOptions, FullCalendarComponent } from '@fullcalendar/angular';
import { BookingStatus, IBooking } from 'src/app/models/booking';
import { take } from 'rxjs/operators';
import { Timestamp } from 'firebase/firestore';
import { ToastService } from 'src/app/services/toast.service';
import { TranslateService } from '@ngx-translate/core';

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
    private translateService:TranslateService,
    private mailService: MailService,
    private cd: ChangeDetectorRef,
    private router: Router,
    private toastService: ToastService
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
        title: this.translateService.instant('app.free'),
        start: item.startDate.toDate(),
        end: item.endDate.toDate(),
        backgroundColor: 'lightblue'
      });
    });
  }

  bookPeriod(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
    var reference = this.generateReference();
    var booking: IBooking = {
      key: this.bookedEvents[0].id,
      firstName: this.form.value.firstName,
      lastName: this.form.value.lastName,
      email: this.form.value.email,
      telephone: this.form.value.telephone,
      status: BookingStatus.Reserved,
      startDate: this.bookedEvents[0].start,
      endDate: this.bookedEvents[0].end,
      reference: reference
    }
    if (this.bookedEvents.length !== 1) {
      booking.startDate = Timestamp.fromDate(this.bookedEvents.sort((a, b) => a.start.getTime() - b.start.getTime())[0].start);
      booking.endDate = Timestamp.fromDate(this.bookedEvents.sort((a, b) => b.end.getTime() - a.end.getTime())[0].end);
      var bookingToKeepIndex = this.bookedEvents.findIndex(x => x.id === booking.key);
      if (bookingToKeepIndex > -1) this.bookedEvents.splice(bookingToKeepIndex, 1);
      this.bookedEvents.forEach(event => this.firebaseService.deleteBooking(event).then(result => console.log('result', result)).catch(error => console.error(error)));
    }
    this.firebaseService.updateBooking(booking).then((result) => {
      this.toastService.show(this.translateService.instant('app.booking-success'), { classname: 'bg-success text-light', delay: 5000 });
      this.router.navigate(['']);
      this.mailService.sendReservationBookedEmail(booking);
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

  getPlaceholderText(key:string):string{
    return this.translateService.instant(key);
  }

}
