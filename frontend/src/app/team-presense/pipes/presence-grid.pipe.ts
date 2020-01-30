import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'presenceGrid'
})
export class PresenceGridPipe implements PipeTransform {

  transform(month: moment.Moment, args?: any): string {
    const days = month.daysInMonth();
    return `30px 240px repeat(${days}, 1fr)`;
  }
}
