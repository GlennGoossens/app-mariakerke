import { Timestamp } from 'firebase/firestore';
import { Injectable } from '@angular/core';
import * as emailjs from 'emailjs-com';
import { IBooking } from '../models/booking';

@Injectable({
  providedIn: 'root'
})
export class MailService {


  public USER_ID: string = 'user_dBuCmIHFCIWNWog1G7TVJ';
  public BOOKED_TEMPLATE_ID = 'reservation_booked';
  public PAYMENT_TEMPLATE_ID = 'payment_done';
  public SERVICE_ID = 'service_d941vdm';

  constructor() {
    this.setupMailer();
  }

  setupMailer() {
    emailjs.init("user_dBuCmIHFCIWNWog1G7TVJ");
  }

  sendReservationBookedEmail(booking: IBooking) {
    var templateParams = {
      'firstName': booking.firstName,
      'startDate': (booking.startDate as Timestamp).toDate().toDateString(),
      'endDate': (booking.endDate as Timestamp).toDate().toDateString(),
      'reference': booking.reference,
      'email': booking.email
    }

    emailjs.send(this.SERVICE_ID, this.BOOKED_TEMPLATE_ID, templateParams, this.USER_ID)
      .then((result) => {
      },
        (error) => {
          alert("An error occured while sending the reservation mail");
        });
  }

  sendPaymentConfirmedEmail(booking: IBooking) {

  }

}
