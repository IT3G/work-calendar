import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';
import { Moment } from 'moment';

@Pipe({
  name: 'isCurrentDayPipe'
})
export class IsCurrentDayPipe implements PipeTransform {
  transform(date: string): boolean {
    return moment(date).isSame(moment(), 'day');
  }
}
