import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import * as moment from 'moment';
import { TaskModel } from '../models/tasks.model';

@Injectable({
  providedIn: 'root',
})
export class TaskMapperService {
  constructor() {}

  public mapTasksToCalendar(tasks: TaskModel[]): TaskModel[] {
    const result = [];

    tasks.forEach((task) => {
      if (task.dateStart !== task.dateEnd) {
        const lastDay = moment(task.dateEnd);
        let nextDate = moment(task.dateStart);

        while (nextDate.isSameOrBefore(lastDay, 'day')) {
          result.push({
            ...task,
            dateStart: nextDate,
          });
          nextDate = nextDate.clone().add(1, 'd');
        }
        return;
      }

      result.push(task);
    });

    return _.orderBy(result, ['dtCreated'], ['desc']);
  }
}
