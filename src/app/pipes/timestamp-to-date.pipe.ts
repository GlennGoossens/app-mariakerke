import { Timestamp } from 'firebase/firestore';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timestampToDate'
})
export class TimestampToDatePipe implements PipeTransform {

  transform(value: Timestamp, ...args: unknown[]): Date {
    return value.toDate();
  }

}
