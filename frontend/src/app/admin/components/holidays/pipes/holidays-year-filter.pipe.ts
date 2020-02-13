import { Pipe, PipeTransform } from '@angular/core';
import { HolidaysModel, HolidaysYearModel } from '../../../../shared/models/holidays.model';

@Pipe({
  name: 'holidaysYearFilterPipe'
})
export class HolidaysYearFilterPipe implements PipeTransform {
  transform(value: HolidaysYearModel[], year: string): HolidaysYearModel[] {
    if (year === '') {
      return value;
    }
    return value.filter((item) => item.year === year);
  }
}
