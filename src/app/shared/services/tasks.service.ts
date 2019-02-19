import { Injectable } from '@angular/core';
import { Moment } from 'moment';
import { TaskModel } from 'src/app/models/tasks.models';
import { TasksStoreService } from 'src/app/store/tasks-store.service';
import { DayType } from '../const/day-type.const';
import { Employee } from 'src/app/models/employee.model';
import * as moment from 'moment';
import { TaskRepositoryService } from 'src/app/task-repository.service';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  constructor(private tasksStoreService: TasksStoreService, private taskRepositoryService: TaskRepositoryService) {}

  addTask(employee: Employee, type: DayType, date: Moment) {
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
      employeeId: employee.id
    };

    this.taskRepositoryService.addOrUpdateTask(newTask);

    // if (found) {
    //   this.taskRepositoryService.updateTask(found, newTask);
    // } else {
    //   this.taskRepositoryService.saveTask(newTask);
    // }

    // this.tasksStoreService.addTasks([...newTasks, newTask]);
  }
}
