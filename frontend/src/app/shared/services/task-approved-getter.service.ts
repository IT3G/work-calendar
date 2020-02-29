import { Injectable } from '@angular/core';
import { Moment } from 'moment';
import { TaskModel } from '../models/tasks.model';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class TaskApprovedGetterService {
  public getTaskApproval(dt: Moment, tasks: TaskModel[]): boolean {
    let dayType = false;

    if (!(tasks && tasks.length)) {
      return dayType;
    }
    const existedTask = tasks.filter((i: TaskModel) => dt.isSame(i.dateStart, 'day'));
    existedTask.sort((a, b) => (moment(a.dtCreated).isAfter(moment(b.dtCreated)) ? -1 : 1));

    if (existedTask.length) {
      const [lastTask] = existedTask;

      dayType = lastTask.approved;
    }
    return dayType;
  }
}
