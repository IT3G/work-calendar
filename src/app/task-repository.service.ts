import { Injectable } from '@angular/core';
import { TaskModel } from './models/tasks.models';
import { Employee } from './models/employee.model';
import { TasksStoreService } from './store/tasks-store.service';
import { DayType } from './shared/const/day-type.const';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class TaskRepositoryService {
  private _tasks: TaskModel[] = [];

  constructor(private tasksStoreService: TasksStoreService) {}

  // public saveTask(taskModel: TaskModel) {
  //   // this._tasks.push(taskModel);
  //   this._tasks = [...this._tasks, taskModel];
  //   this.tasksStoreService.addTasks(this._tasks.filter(i => i.employeeId === taskModel.employeeId));
  // }

  public addOrUpdateTask(task: TaskModel) {
    const dtStr = task.date.format('L');
    const found = this._tasks.find(o => o.date.format('L') === dtStr && o.employeeId === task.employeeId);

    let newTasks: TaskModel[] = this._tasks;

    if (found) {
      newTasks = this._tasks.filter(o => o !== found);
    }

    this._tasks = [...newTasks, task];

    // this._tasks.push(taskModel);
    // this._tasks = [...this._tasks, taskModel];
    this.tasksStoreService.addTasks(this._tasks.filter(i => i.employeeId === task.employeeId));
  }

  public loadTasks(employee: Employee) {
    // const task = { id: 1, type: DayType.SICK, date: moment().startOf('day') };

    // this.tasksStoreService.addTasks([task]);

    this.tasksStoreService.addTasks(this._tasks.filter(i => i.employeeId === employee.id));
  }
}
