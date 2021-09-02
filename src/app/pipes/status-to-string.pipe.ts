import { BookingStatus } from './../models/booking';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'statusToString'
})
export class StatusToStringPipe implements PipeTransform {

  transform(value: BookingStatus, ...args: unknown[]): string {
    switch (value) {
      case BookingStatus.Free:
        return "Vrij";
      case BookingStatus.Reserved:
        return "Nog te betalen";
      case BookingStatus.Booked:
        return "Betaald";
    }
  }

}
