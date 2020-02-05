import { Component, Input, OnInit } from '@angular/core';
import * as moment from 'moment';
import { combineLatest, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { TaskApiService } from '../../../core/services/task-api.service';
import { DayType } from '../../../shared/const/day-type.const';
import { Employee } from '../../../shared/models/employee.model';
import { SendingTaskModel } from '../../../shared/models/sending-task.model';
import { TaskModel } from '../../../shared/models/tasks.models';

@Component({
  selector: 'app-profile-history',
  templateUrl: './profile-history.component.html',
  styleUrls: ['./profile-history.component.scss']
})
export class ProfileHistoryComponent implements OnInit {
  @Input()
  userLogin: string;
  @Input()
  users$: Observable<Employee[]>;

  public dayType = DayType;
  public taskHistory$: Observable<SendingTaskModel[]>;
  public activity: SendingTaskModel[];

  constructor(private taskApi: TaskApiService) {}

  ngOnInit() {
    this.loadTasks(this.userLogin);
  }

  public hasDateRange(task: TaskModel): boolean {
    return !moment(task.dateStart).isSame(moment(task.dateEnd));
  }

  private loadTasks(user: string): void {
    this.taskHistory$ = this.taskApi.loadAllTasksByAuthor(user);
    combineLatest([this.users$, this.taskHistory$])
      .pipe(filter(([users, tasks]) => !!users.length && !!tasks.length))
      .subscribe(([users, tasks]) => {
        this.activity = tasks
          .map(task => {
            const currentUser = users.find(u => u.mailNickname === task.employee);
            if (!currentUser) {
              return;
            }
            task.employee = currentUser.username ? currentUser.username : currentUser.mailNickname;
            return task;
          })
          .filter(t => !!t);
      });
  }
}
