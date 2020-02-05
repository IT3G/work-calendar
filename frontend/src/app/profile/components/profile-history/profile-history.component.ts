import { Component, Input, OnInit } from '@angular/core';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { TaskApiService } from '../../../core/services/task-api.service';
import { DayType } from '../../../shared/const/day-type.const';
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

  public dayType = DayType;
  public taskHistory$: Observable<SendingTaskModel[]>;
  public activity: SendingTaskModel[];

  constructor(private taskApi: TaskApiService) {}

  ngOnInit() {
    this.taskHistory$ = this.taskApi.loadAllTasksByAuthor(this.userLogin);
  }

  public hasDateRange(task: TaskModel): boolean {
    return !moment(task.dateStart).isSame(moment(task.dateEnd));
  }
}
