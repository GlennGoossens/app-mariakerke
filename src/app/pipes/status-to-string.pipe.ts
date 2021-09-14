import { BookingStatus } from './../models/booking';
import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Pipe({
  name: 'statusToString'
})
export class StatusToStringPipe implements PipeTransform {

  /**
   *
   */
  constructor(private translateService:TranslateService) {
    
  }

  transform(value: BookingStatus, ...args: unknown[]): string {
    switch (value) {
      case BookingStatus.Free:
        return this.translateService.instant('app.free');
      case BookingStatus.Reserved:
        return this.translateService.instant('app.reserved');
      case BookingStatus.Booked:
        return this.translateService.instant('app.booked');
    }
  }

}
