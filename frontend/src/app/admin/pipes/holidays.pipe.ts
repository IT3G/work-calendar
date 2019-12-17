import { Pipe, PipeTransform } from '@angular/core';
import { HolidaysModel } from '../components/holidays/holidays.component';

@Pipe({
  name: 'holidays'
})
export class HolidaysPipe implements PipeTransform {

  transform(value: HolidaysModel[], year: string): HolidaysModel[] {
    if (year === '') {
      return  value;
    }
    return value.filter(item => item.year === year);
  }

}
