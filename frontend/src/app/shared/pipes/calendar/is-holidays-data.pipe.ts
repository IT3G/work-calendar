import { Pipe, PipeTransform } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { HolidaysModel, MonthNumber } from '../../models/holidays.model';

@Pipe({
  name: 'isHolidayData'
})
export class IsHolidayDataPipe implements PipeTransform {

  transform(date: NgbDateStruct, holidays: HolidaysModel[]): string {
    if (!date || !holidays) {
      return `day_WORK`;
    }

    const currentMonth = holidays[0].data.find(item => item.year === date.year.toString());

    const monthName = MonthNumber[date.month - 1];
    const arr = currentMonth && currentMonth[monthName] && currentMonth[monthName].split(',');

    const isHoliday = arr ? arr.includes(`${date.day}`) : false;
    if (isHoliday) {
      return `day_HOLIDAY`;
    }

    const isPreHoliday = arr ? arr.includes(`${date.day}*`) : false;
    if (isPreHoliday) {
      return `day_PRE_HOLIDAY`;
    }

    return `day_WORK`;
  }
}
