import { Injectable } from '@angular/core';
import { Employee } from 'src/app/models/employee.model';
import { TaskModel } from 'src/app/models/tasks.models';
import { TasksStoreService } from 'src/app/store/tasks-store.service';
import { TaskApiService } from '../../task-api.service';

@Injectable({
  providedIn: 'root'
})
export class TaskApiInMemoryService implements TaskApiService {
  private _tasks: TaskModel[] = [];

  constructor(private tasksStoreService: TasksStoreService) {}

  // public saveTask(taskModel: TaskModel) {
  //   // this._tasks.push(taskModel);
  //   this._tasks = [...this._tasks, taskModel];
  //   this.tasksStoreService.addTasks(this._tasks.filter(i => i.employeeId === taskModel.employeeId));
  // }

  public addTask(task: TaskModel) {
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

  public loadAllTasks() {}
}
