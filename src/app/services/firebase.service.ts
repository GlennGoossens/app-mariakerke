import { IBooking } from 'src/app/models/booking';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Timestamp } from 'firebase/firestore';
import { StarTemplateContext } from '@ng-bootstrap/ng-bootstrap/rating/rating';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  private bookingPath = '/bookings';

  private bookings: AngularFirestoreCollection<IBooking>;

  constructor(private db: AngularFirestore) {
    this.bookings = db.collection(this.bookingPath);
  }

  async createBooking(booking: IBooking): Promise<any> {
    return this.bookings.add(booking);
  }

  async updateBooking(booking: IBooking): Promise<any> {
    if (booking.key === null) return this.createBooking(booking);
    else return this.bookings.doc(booking.key).update(booking);
  }

  getAllBookings(): Observable<IBooking[]> {
    return this.bookings.valueChanges({ idField: 'key' });

  }
  getAllAvailableBookings(): Observable<IBooking[]> {
    return this.getAllBookings().pipe(
      map((data: IBooking[]) => data.filter(d => d.status === 0))
    );
  }

  getAllBookabkeBookings(): Observable<IBooking[]> {
    return this.getAllAvailableBookings().pipe(
      map((data: IBooking[]) => data.filter(d => d.startDate >= Timestamp.fromDate(new Date())))
    )
  }

  getAllReservedOrBookedBookings(): Observable<IBooking[]> {
    return this.getAllBookings().pipe(
      map((data: IBooking[]) => data.filter(d => d.status !== 0))
    );
  }

  async fillBookings(start: Date): Promise<any> {
    let end: Date = new Date();
    end.setDate(start.getDate() + 6);
    let stDate: Date = start;
    for (var i = 0; i <= 250; i++) {
      this.bookings.add({
        startDate: Timestamp.fromDate(stDate),
        endDate: Timestamp.fromDate(end),
        status: 0
      });
      end.setDate(end.getDate() + 7);
      stDate.setDate(stDate.getDate() + 7);
    }
  }
}
