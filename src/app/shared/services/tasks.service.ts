import { Injectable } from '@angular/core';
import { Moment } from 'moment';
import { TaskModel } from 'src/app/models/tasks.models';
import { TasksStoreService } from 'src/app/store/tasks-store.service';
import { DayType } from '../const/day-type.const';
import { Employee } from 'src/app/models/employee.model';
import * as moment from 'moment';
import { TaskApiService } from 'src/app/services/task-api.service';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  constructor(private tasksStoreService: TasksStoreService, private taskApiService: TaskApiService) {}

  addTask(employee: Employee, type: DayType, date: Moment, comment: string) {
    // const dtStr = date.format('L');
    // const found = this.tasksStoreService.getTasks().find(o => o.date.format('L') === dtStr);

    // let newTasks: TaskModel[] = this.tasksStoreService.getTasks();

    // if (found) {
    //   newTasks = this.tasksStoreService.getTasks().filter(o => o !== found);
    // }

    const newTask = {
      id: this.tasksStoreService.getTasks().length + 1,
      type: type,
      date: date,
      comment: comment,
      employeeId: employee.id
    };

    this.taskApiService.addTask(newTask);

    // if (found) {
    //   this.taskApiService.updateTask(found, newTask);
    // } else {
    //   this.taskApiService.saveTask(newTask);
    // }

    // this.tasksStoreService.addTasks([...newTasks, newTask]);
  }
}
