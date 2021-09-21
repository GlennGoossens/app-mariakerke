import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ImageModalComponent } from '../image-modal/image-modal.component';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit {

  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
  }

  openInModal(event:MouseEvent,link:string){
    event.preventDefault();
    event.stopPropagation();
    const modalRef = this.modalService.open(ImageModalComponent,{centered:true,size: 'lg'});
    modalRef.componentInstance.link = link;
  }

}
