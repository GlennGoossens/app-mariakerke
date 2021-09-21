import { IBooking } from 'src/app/models/booking';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Timestamp } from 'firebase/firestore';

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

  async deleteBooking(booking: IBooking): Promise<any> {
    this.bookings.doc(booking.id?.toString()).delete();
    return this.bookings.doc(booking.id?.toString()).delete();
  }

  getAllBookings(): Observable<IBooking[]> {
    return this.bookings.valueChanges({ idField: 'key' });

  }
  getAllAvailableBookings(): Observable<IBooking[]> {
    return this.getAllBookings().pipe(
      map((data: IBooking[]) => data.filter(d => d.status === 0))
    );
  }

  getAllBookableBookings(): Observable<IBooking[]> {
    return this.getAllAvailableBookings().pipe(
      map((data: IBooking[]) => data.filter(d => d.startDate >= Timestamp.fromDate(new Date())))
    )
  }

  getAllReservedBookings(): Observable<IBooking[]> {
    return this.getAllBookings().pipe(
      map((data: IBooking[]) => data.filter(d => d.status == 1))
    );
  }

  getAllReservedOrBookedBookings(): Observable<IBooking[]> {
    return this.getAllBookings().pipe(
      map((data: IBooking[]) => data.filter(d => d.status !== 0))
    );
  }

  async fillBookings(start: Date): Promise<any> {
    let startDate = new Date(start);
    let endDate: Date = new Date(start);
    endDate.setHours(endDate.getHours() + 12);
    endDate.setDate(startDate.getDate() + 6);
    for (var i = 0; i <= 250; i++) {
      this.bookings.add({
        startDate: Timestamp.fromDate(startDate),
        endDate: Timestamp.fromDate(endDate),
        status: 0
      });
      endDate.setDate(endDate.getDate() + 7);
      startDate.setDate(startDate.getDate() + 7);
    }
  }
}
