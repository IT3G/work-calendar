import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { DayType } from 'src/app/const/day-type.const';
import { TaskModel } from 'src/app/models/tasks.models';
import { ContextStoreService } from 'src/app/store/context-store.service';
import { TaskApiService } from '../../task-api.service';

@Injectable({
  providedIn: 'root'
})
export class TaskApiInBackendService implements TaskApiService {
  constructor(private http: HttpClient, private contextStoreService: ContextStoreService) {}

  public addTask(task: TaskModel): Observable<Object> {
    console.log('do me for this');
    const obj = {
      dateStart: task.dateStart.toISOString(),
      dateEnd: task.dateEnd.toISOString(),
      type: DayType[task.type],
      comment: task.comment,
      employee: task.employee,
      dtCreated: moment().toISOString(),
      employeeCreated: this.contextStoreService.getCurrentUser().mailNickname
    };

    console.log(obj);

    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post('/backend/tasks', JSON.stringify(obj), { headers: headers });
  }

  public loadAllTasks() {
    return this.http.get('/backend/tasks');
  }

  public mapToTaskModel(task: TaskModel[]): TaskModel[] {
    const result = task.map(i => {
      return {
        ...i,
        dateStart: moment(i.dateStart),
        dateEnd: moment(i.dateEnd),
        dtCreated: moment(i.dtCreated),
        type: DayType[i.type]
      };
    });

    const bar = [];
    result.forEach(item => {
      if (item.dateStart !== item.dateEnd) {
        const lastDay = moment(item.dateEnd);
        let nextDate = moment(item.dateStart);

        while (nextDate.isSameOrBefore(lastDay)) {
          bar.push({
            ...item,
            dateStart: nextDate
          });
          nextDate = nextDate.clone().add(1, 'd');
        }
        return;
      }

      bar.push(item);
    });

    const sorted = _.orderBy(bar, ['dtCreated'], ['desc']);
    return sorted;
  }
}
