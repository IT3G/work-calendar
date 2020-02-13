import { Pipe, PipeTransform } from '@angular/core';
import { HolidaysModel, MonthNumber } from '../../models/holidays.model';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';

@Pipe({
  name: 'isHolidayDayForNgbModel'
})
export class IsHolidayDayForNgbModelPipe implements PipeTransform {
  transform(dateSrc: NgbDateStruct, holidays: HolidaysModel[]): string {
    if (!dateSrc || !(holidays && holidays.length)) {
      return `day_WORK`;
    }

    const dateMoment = {
      year: dateSrc.year,
      month: dateSrc.month - 1,
      day: dateSrc.day
    };

    const date = moment(dateMoment);

    const currentYear = holidays[0].data.find((item) => item.year === date.year().toString());
    const monthName = MonthNumber[date.month()];
    const arr = currentYear && currentYear[monthName] && currentYear[monthName].split(',');

    const isHoliday = arr ? arr.includes(`${date.format('D')}`) : false;
    if (isHoliday) {
      return `day_HOLIDAY`;
    }

    const isPreHoliday = arr ? arr.includes(`${date.format('D')}*`) : false;
    if (isPreHoliday) {
      return `day_PRE_HOLIDAY`;
    }

    return `day_WORK`;
  }
}
