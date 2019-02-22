import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import * as moment from 'moment';
import { Employee } from 'src/app/models/employee.model';
import { TaskModel } from 'src/app/models/tasks.models';
import { ContextStoreService } from 'src/app/store/context-store.service';
import { TasksStoreService } from 'src/app/store/tasks-store.service';
import { TaskApiService } from '../task-api.service';

@Injectable({
  providedIn: 'root'
})
export class TaskApiInFireBaseService implements TaskApiService {
  private _tasks: TaskModel[] = [];
  private tasksRef: AngularFirestoreCollection<any>;
  constructor(
    private tasksStoreService: TasksStoreService,
    private db: AngularFirestore,
    private contextStoreService: ContextStoreService,
    private db1: AngularFireDatabase
  ) {}

  public addOrUpdateTask(task: TaskModel) {
    const dtStr = task.date.format('L');
    const found = this._tasks.find(o => o.date.format('L') === dtStr && o.employeeId === task.employeeId);

    let newTasks: TaskModel[] = this._tasks;

    if (found) {
      newTasks = this._tasks.filter(o => o !== found);
      // debugger;
      // this.addTaskOrUpdate(found, true).then(res => console.log(res));
    }

    this._tasks = [...newTasks, task];
    this.addTaskOrUpdate(task).then(res => console.log(res));
  }

  public loadTasks(employee: Employee) {
    this.getTasks().subscribe(res => {
      const result = res.map(i => {
        return {
          ...i,
          date: moment(i.date)
        };
      });
      this.tasksStoreService.addTasks(result);
    });
  }

  private addTaskOrUpdate(task: TaskModel, isUpdate?: boolean) {
    this.tasksRef = this.db.collection('tasks');
    // if (isUpdate) {
    //   const itemsRef = this.db1.list('tasks');
    //   // this.tasksRef = this.db.collection('tasks', ref => ref.where('date', '==', task.date.format()));
    //   itemsRef.update(task.date.toString(), { displayName: 'New trainer' });
    // }
    const obj = {
      date: task.date.format(),
      type: task.type,
      id: task.id,
      employeeId: task.employeeId
    };

    return this.tasksRef.add(obj);
  }

  public getTasks() {
    this.tasksRef = this.db.collection('tasks', ref =>
      ref.where('employeeId', '==', this.contextStoreService.getSelectedUser().id)
    );
    return this.tasksRef.valueChanges();
  }
}
