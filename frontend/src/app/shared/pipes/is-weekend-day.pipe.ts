import { Pipe, PipeTransform } from '@angular/core';
import { Moment } from 'moment';

@Pipe({
  name: 'isWeekendDayPipe'
})
export class IsWeekendDayPipe implements PipeTransform {
  transform(date: Moment): boolean {
    return date.format('d') === '0' || date.format('d') === '6';
  }
}
