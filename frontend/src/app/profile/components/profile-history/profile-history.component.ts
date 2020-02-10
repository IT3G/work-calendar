import { Component, Input, OnInit, SimpleChanges, OnChanges } from '@angular/core';
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
export class ProfileHistoryComponent implements OnChanges {
  @Input()
  userLogin: string;

  public dayType = DayType;
  public taskHistory$: Observable<SendingTaskModel[]>;
  public activity: SendingTaskModel[];

  constructor(private taskApi: TaskApiService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.userLogin && changes.userLogin.currentValue) {
      this.taskHistory$ = this.taskApi.loadAllTasksByAuthor(this.userLogin);
    }
  }

  public hasDateRange(task: TaskModel): boolean {
    return !moment(task.dateStart).isSame(moment(task.dateEnd));
  }
}
