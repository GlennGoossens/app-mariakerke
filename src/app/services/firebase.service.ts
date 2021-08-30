import { IBooking, IPeriod } from '../models/booking';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { getDocs, query, where } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  private bookingPath = '/bookings';
  private periodPath = '/periods';

  private bookings: AngularFirestoreCollection<IBooking>;
  private periods: AngularFirestoreCollection<IPeriod>;

  constructor(private db: AngularFirestore) {
    this.bookings = db.collection(this.bookingPath);
    this.periods = db.collection(this.periodPath);
  }

  getAllBookings(): any {
    return this.bookings;
  }

  async createBooking(booking: IBooking): Promise<any> {
    return this.bookings.add(booking);
  }

  async updateBooking(booking: IBooking): Promise<any> {
    if (booking.key === null) return this.createBooking(booking);
    else return this.bookings.doc(booking.key).update(booking);
  }

  getAllPeriods(): Observable<IPeriod[]> {
    return this.periods.valueChanges();

  }
  getAllAvailablePeriods(): Observable<IPeriod[]> {
    return this.getAllPeriods().pipe(
      map((data: IPeriod[]) => data.filter(d => d.isBooked === false))
    );
  }

  getAllReservedOrBookedPeriods(): Observable<IPeriod[]> {
    return this.getAllPeriods().pipe(
      map((data: IPeriod[]) => data.filter(d => d.isBooked === true))
    );
  }

  async fillPeriods(startDate: Date): Promise<any> {
    let period: IPeriod = {
      startDate: startDate,
      isBooked: false
    }
    for (var i = 0; i <= 100; i++) {
      this.periods.add(period);
      console.log('adding period', period);
      period.startDate.setDate(period.startDate.getDate() + 7);
    }
  }
}
