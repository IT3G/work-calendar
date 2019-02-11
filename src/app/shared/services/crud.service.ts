import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import * as moment from 'moment';
import { TasksModel } from 'src/app/models/tasks.models';
import { TasksRequestModel } from 'src/app/models/tasks.request.model';

@Injectable({
  providedIn: 'root'
})
export class CrudService {
  tasksRef: AngularFirestoreCollection<any>;

  constructor(private db: AngularFirestore) {}

  public addTask(task: TasksModel) {
    this.tasksRef = this.db.collection('tasks');

    const object: TasksRequestModel = {
      dateEnd: moment(task.dateEnd).format(),
      dateStart: moment(task.dateStart).format(),
      id: task.id,
      timeStamp: moment().format()
    };

    return this.tasksRef.add(object);
  }

  public getTasks() {
    this.tasksRef = this.db.collection('tasks', ref => ref.orderBy('timeStamp', 'desc'));

    return this.tasksRef.valueChanges();
  }
}
