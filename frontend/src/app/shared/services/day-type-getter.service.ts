import { Injectable } from '@angular/core';
import { Moment } from 'moment';
import { DayType } from '../const/day-type.const';
import { TaskModel } from '../models/tasks.models';

@Injectable({
  providedIn: 'root'
})
export class DayTypeGetterService {
  public getDayType(dt: Moment, tasks: TaskModel[]): DayType {
    const existedTask = tasks.filter((i: TaskModel) => dt.isSame(i.dateStart, 'day'));
    existedTask.sort((a, b) => (a.dtCreated.isAfter(b.dtCreated) ? -1 : 1));
    let dayType = DayType.COMMON;

    if (existedTask.length) {
      const lastTask = existedTask[0];

      dayType = lastTask.type;
    } else if (dt.weekday() === 5 || dt.weekday() === 6) {
      dayType = 6;
    }

    if ((dayType === DayType.COMMON && dt.weekday() === 5) || (dt.weekday() === 6 && dayType === DayType.COMMON)) {
      dayType = 6;
    }
    return dayType;
  }
}
