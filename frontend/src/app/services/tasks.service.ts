import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { Moment } from 'moment';
import { Employee } from 'src/app/models/employee.model';
import { TaskApiService } from 'src/app/services/api/task-api.service';
import { ContextStoreService } from 'src/app/store/context-store.service';
import { TasksStoreService } from 'src/app/store/tasks-store.service';
import { DayType } from '../const/day-type.const';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  constructor(
    private tasksStoreService: TasksStoreService,
    private taskApiService: TaskApiService,
    private contextStoreService: ContextStoreService
  ) {}

  addTask(employee: Employee, type: DayType, date: Moment, comment: string) {
    // const dtStr = date.format('L');
    // const found = this.tasksStoreService.getTasks().find(o => o.date.format('L') === dtStr);

    // let newTasks: TaskModel[] = this.tasksStoreService.getTasks();

    // if (found) {
    //   newTasks = this.tasksStoreService.getTasks().filter(o => o !== found);
    // }

    const newTask = {
      id: this.tasksStoreService.getTasksSnapshot().length + 1,
      type: type,
      date: date,
      comment: comment,
      employeeId: employee.id,
      dtCreated: moment(),
      userCreated: this.contextStoreService.getCurrentUser().id
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
