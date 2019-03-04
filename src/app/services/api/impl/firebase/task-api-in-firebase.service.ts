import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import * as moment from 'moment';
import { Employee } from 'src/app/models/employee.model';
import { TaskModel } from 'src/app/models/tasks.models';
import { ContextStoreService } from 'src/app/store/context-store.service';
import { TasksStoreService } from 'src/app/store/tasks-store.service';
import { TaskApiService } from '../../task-api.service';
import * as firebase from 'firebase';
import * as _ from 'lodash';
import { DayType } from 'src/app/const/day-type.const';

@Injectable({
  providedIn: 'root'
})
export class TaskApiInFireBaseService implements TaskApiService {
  constructor(
    private tasksStoreService: TasksStoreService,
    private db: AngularFirestore,
    private contextStoreService: ContextStoreService
  ) {}

  public addTask(task: TaskModel) {
    const obj = {
      date: new Date(task.date.toDate()),
      type: DayType[task.type],
      id: task.id,
      comment: task.comment,
      employeeId: task.employeeId,
      dtCreated: firebase.firestore.FieldValue.serverTimestamp(),
      userCreated: this.contextStoreService.getCurrentUser().id
    };

    this.db.collection<any>('tasks').add(obj); // .then(res => console.log(res));
  }

  public loadTasks(employee: Employee) {
    this.db
      .collection('tasks', ref => ref.where('employeeId', '==', this.contextStoreService.getSelectedUser().id))
      .valueChanges()
      .subscribe(res => {
        const result = this.mapToTaskModel(res);
        this.tasksStoreService.addTasks(result);
      });
  }

  public loadAllTasks() {
    this.db
      .collection('tasks')
      .valueChanges()
      .subscribe(res => {
        const result = this.mapToTaskModel(res);
        this.tasksStoreService.addTasks(result);
      });
  }

  private mapToTaskModel(res: any[]) {
    const result = res.map(i => {
      return {
        ...i,
        date: moment.unix(i.date.seconds),
        type: DayType[i.type]
      };
    });
    const sorted = _.orderBy(result, ['dtCreated'], ['desc']); // most fresh at the end -> can overwrite values from ui multiple times
    return sorted;
  }
}
