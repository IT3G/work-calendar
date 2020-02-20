import { Pipe, PipeTransform } from '@angular/core';
import { Employee } from '../../models/employee.model';
import { TaskModel } from '../../models/tasks.model';
import * as moment from 'moment';

/** флаг, разрешающий удалить календарную запись */
@Pipe({
  name: 'canDeleteTask'
})
export class CanDeleteTaskPipe implements PipeTransform {
  transform(task: TaskModel, taskOwner: Employee, currentUser: Employee): boolean {
    return (
      (currentUser._id === taskOwner._id && moment(task.dateStart).isSameOrAfter(moment(), 'day')) ||
      currentUser.isAdmin
    );
  }
}
