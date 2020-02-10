import { Injectable } from '@angular/core';
import { Moment } from 'moment';
import { DayType } from '../const/day-type.const';
import { TaskModel } from '../models/tasks.model';

@Injectable({
  providedIn: 'root'
})
export class DayTypeGetterService {
  public getDayType(dt: Moment, tasks: TaskModel[]): DayType {
    let dayType = DayType.COMMON;

    if (!(tasks && tasks.length)) {
      return dayType;
    }
    const existedTask = tasks.filter((i: TaskModel) => dt.isSame(i.dateStart, 'day'));
    existedTask.sort((a, b) => (a.dtCreated.isAfter(b.dtCreated) ? -1 : 1));


    if (existedTask.length) {
      const lastTask = existedTask[0];

      dayType = lastTask.type;
    }
    return dayType;
  }
}
