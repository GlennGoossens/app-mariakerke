import { Component, OnInit, ViewChild } from '@angular/core';
import { ControlContainer, FormControl, FormGroup, Validators } from '@angular/forms';
import { CalendarOptions, FullCalendarComponent } from '@fullcalendar/angular';

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
    period: new FormControl('', Validators.required)
  });

  calendarOptions: CalendarOptions = {
    firstDay: 1,
    height: 'auto',
    initialView: 'dayGridMonth',
    events: [
      { title: 'Vrij', start: '2021-08-02', end: '2021-08-09' },
      { title: 'Vrij', start: '2021-08-23', end: '2021-08-30' }
    ],
    eventClick: this.onSelectFreePeriod
  };

  @ViewChild('calendar') calendarComponent: FullCalendarComponent;


  constructor() { }

  ngOnInit(): void {
    window.scroll(0, 0);
  }

  bookPeriod(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
    console.log(this.form.value);
  }

  onSelectFreePeriod(info: any) {
    console.log(info);
    this.form.controls.period.setValue(info.event.title);
  }

}
