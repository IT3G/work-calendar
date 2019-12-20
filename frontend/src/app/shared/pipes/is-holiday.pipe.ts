import { Pipe, PipeTransform } from '@angular/core';
import { Moment } from 'moment';

@Pipe({
  name: 'isHoliday'
})
export class IsHolidayPipe implements PipeTransform {

  transform(date: Moment, days: any): any {
    console.log(days);
    return date.format('d') === '0' || date.format('d') === '6';
  }

}
