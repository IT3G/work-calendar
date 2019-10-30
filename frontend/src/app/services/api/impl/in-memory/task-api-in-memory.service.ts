import { Injectable } from '@angular/core';
import { TaskModel } from 'src/app/models/tasks.models';
import { TasksStoreService } from 'src/app/store/tasks-store.service';

@Injectable({
  providedIn: 'root'
})
export class TaskApiInMemoryService {
  private _tasks: TaskModel[] = [];

  constructor(private tasksStoreService: TasksStoreService) {}

  public addTask(task: TaskModel) {
    const dtStr = task.dateStart.format('L');
    const found = this._tasks.find(o => o.dateStart.format('L') === dtStr && o.employee === task.employee);

    let newTasks: TaskModel[] = this._tasks;

    if (found) {
      newTasks = this._tasks.filter(o => o !== found);
    }

    this._tasks = [...newTasks, task];

    this.tasksStoreService.addTasks(this._tasks.filter(i => i.employee === task.employee));
  }

  public loadTasksByUserId(id: string) {
    this.tasksStoreService.addTasks(this._tasks.filter((i: any) => i.employeeId === +id));
  }
}
