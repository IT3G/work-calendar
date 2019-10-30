import { Injectable } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { Moment } from 'moment';

@Injectable({ providedIn: 'root' })
export class DateConvertService {
  constructor() {}

  public convertMomentToNgbDate(dateMoment: Moment): NgbDateStruct {
    return {
      year: dateMoment.year(),
      month: dateMoment.month() + 1,
      day: dateMoment.date()
    };
  }

  public convertNgbDateToMoment(dateNgbDate: NgbDateStruct): Moment {
    const dateMoment = {
      year: dateNgbDate.year,
      month: dateNgbDate.month - 1,
      day: dateNgbDate.day
    };
    return moment(dateMoment);
  }
}
