import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import * as moment from 'moment';
import { DayType } from '../../shared/const/day-type.const';
import { SendingTaskModel } from '../../shared/models/sending-task.model';
import { TaskModel } from '../../shared/models/tasks.models';

@Injectable({
  providedIn: 'root'
})
export class TaskMapperService {
  constructor() {}

  public mapToTaskModel(task: TaskModel[]): TaskModel[] {
    const result = task.map(i => {
      return {
        ...i,
        dateStart: moment(i.dateStart),
        dateEnd: moment(i.dateEnd),
        dtCreated: moment(i.dtCreated),
        type: DayType[i.type]
      };
    });

    const bar = [];
    result.forEach(item => {
      if (item.dateStart !== item.dateEnd) {
        const lastDay = moment(item.dateEnd);
        let nextDate = moment(item.dateStart);

        while (nextDate.isSameOrBefore(lastDay)) {
          bar.push({
            ...item,
            dateStart: nextDate
          });
          nextDate = nextDate.clone().add(1, 'd');
        }
        return;
      }

      bar.push(item);
    });

    const sorted = _.orderBy(bar, ['dtCreated'], ['desc']);
    return sorted;
  }

  public mapToSendingModel(task: TaskModel): SendingTaskModel {
    return {
      type: DayType[task.type],
      dateStart: task.dateStart.toISOString(),
      dateEnd: task.dateEnd.toISOString(),
      employee: task.employee,
      comment: task.comment,
      dtCreated: task.dtCreated.toISOString(),
      employeeCreated: task.employeeCreated
    };
  }
}
