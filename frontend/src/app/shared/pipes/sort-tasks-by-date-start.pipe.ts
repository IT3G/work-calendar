import { Pipe, PipeTransform } from '@angular/core';
import { TaskModel } from '../models/tasks.model';
import * as moment from 'moment';

@Pipe({
  name: 'sortTasksByDateStart'
})
export class SortTasksByDateStartPipe implements PipeTransform {
  transform(value: TaskModel[]): TaskModel[] {
    if (!value) {
      return [];
    }

    return value.sort((a, b) => (moment(a.dateStart).isBefore(moment(b.dateStart), 'day') ? 1 : -1));
  }
}
