import { Injectable } from '@angular/core';
import { Moment } from 'moment';
import { DayType } from '../const/day-type.const';
import { TaskModel } from '../models/tasks.models';

@Injectable({
  providedIn: 'root'
})
export class DayTypeGetterService {
  public getDayType(dt: Moment, tasks: TaskModel[]): DayType {
    const existedTask = tasks.find((i: TaskModel) => dt.isSame(i.dateStart, 'day'));

    let dayType = DayType.COMMON;

    if (existedTask) {
      dayType = existedTask.type;
    } else if (dt.weekday() === 5 || dt.weekday() === 6) {
      dayType = DayType.LEFT;
    }

    return dayType;
  }
}
