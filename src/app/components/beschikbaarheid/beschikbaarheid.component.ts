import { Component, OnInit, ViewChild } from '@angular/core';
import { CalendarOptions, FullCalendarComponent } from '@fullcalendar/angular';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BookModalComponent } from 'src/app/modals/book-modal/book-modal.component';

@Component({
  selector: 'app-beschikbaarheid',
  templateUrl: './beschikbaarheid.component.html',
  styleUrls: ['./beschikbaarheid.component.css']
})
export class BeschikbaarheidComponent implements OnInit {

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    events: [
      { title: 'Bezet', start: '2021-08-02',end:'2021-08-09' },
      { title: 'Bezet', start: '2021-08-23',end:'2021-08-30' }
    ]
  };

  @ViewChild('calendar') calendarComponent: FullCalendarComponent;


  constructor(
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
  }

  openBookModal(){
    this.modalService.open(BookModalComponent,{ centered:true, size: 'lg' }).result.then((result) =>{
      window.alert("Boeking word doorgestuurd naar de database");
    });
  }

}
