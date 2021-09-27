import { Timestamp } from 'firebase/firestore';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timestampToDate'
})
export class TimestampToDatePipe implements PipeTransform {

  transform(value: Timestamp | Date, ...args: unknown[]): Date {
    return (value as Timestamp).toDate();
  }

}
