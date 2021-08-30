import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CalendarOptions, FullCalendarComponent } from '@fullcalendar/angular';

@Component({
  selector: 'app-beschikbaarheid',
  templateUrl: './beschikbaarheid.component.html',
  styleUrls: ['./beschikbaarheid.component.css']
})
export class BeschikbaarheidComponent implements OnInit {

  calendarOptions: CalendarOptions = {
    firstDay: 1,
    height: 'auto',
    initialView: 'dayGridMonth',
    events: [
      { title: 'Bezet', start: '2021-08-02', end: '2021-08-09' },
      { title: 'Bezet', start: '2021-08-23', end: '2021-08-30' }
    ]
  };

  @ViewChild('calendar') calendarComponent: FullCalendarComponent;


  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  onNavigateToBook() {
    this.router.navigate(['/book'])
  }

}
