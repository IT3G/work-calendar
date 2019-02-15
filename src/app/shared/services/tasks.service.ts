import { Injectable } from '@angular/core';
import { Moment } from 'moment';
import { TaskModel } from 'src/app/models/tasks.models';
import { TasksStoreService } from 'src/app/store/tasks-store.service';
import { DayType } from '../const/day-type.const';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  constructor(private tasksStoreService: TasksStoreService) {}

  addTask(type: DayType, date: Moment) {
    const dtStr = date.format('L');
    const found = this.tasksStoreService.getTasks().find(o => o.date.format('L') === dtStr);

    let newTasks: TaskModel[] = this.tasksStoreService.getTasks();

    if (found) {
      newTasks = this.tasksStoreService.getTasks().filter(o => o !== found);
    }

    const newTask = {
      id: this.tasksStoreService.getTasks().length + 1,
      type: type,
      date: date,
      day: date.startOf('day')
    };

    this.tasksStoreService.addTasks([...newTasks, newTask]);
  }
}
