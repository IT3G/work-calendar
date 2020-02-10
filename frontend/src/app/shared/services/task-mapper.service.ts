import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import * as moment from 'moment';
import { DayType } from '../const/day-type.const';
import { SendingTaskModel } from '../models/sending-task.model';
import { TaskModel } from '../models/tasks.model';

@Injectable({
  providedIn: 'root'
})
export class TaskMapperService {
  constructor() {}

  public mapToTaskModel(tasks: SendingTaskModel[]): TaskModel[] {
    const result = tasks.map(task => {
      return {
        ...task,
        dateStart: moment(task.dateStart, 'YYYY-MM-DD'),
        dateEnd: moment(task.dateEnd, 'YYYY-MM-DD'),
        dtCreated: moment(task.dtCreated),
        type: DayType[task.type]
      };
    });

    const bar = [];
    result.forEach(task => {
      if (task.dateStart !== task.dateEnd) {
        const lastDay = moment(task.dateEnd);
        let nextDate = moment(task.dateStart);

        while (nextDate.isSameOrBefore(lastDay)) {
          bar.push({
            ...task,
            dateStart: nextDate
          });
          nextDate = nextDate.clone().add(1, 'd');
        }
        return;
      }

      bar.push(task);
    });

    return _.orderBy(bar, ['dtCreated'], ['desc']);
  }

  public mapToSendingModel(task: TaskModel): SendingTaskModel {
    return {
      type: DayType[task.type],
      dateStart: task.dateStart.format('YYYY-MM-DD'),
      dateEnd: task.dateEnd.format('YYYY-MM-DD'),
      employee: task.employee,
      comment: task.comment,
      dtCreated: task.dtCreated.toISOString(),
      employeeCreated: task.employeeCreated
    };
  }
}
