import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TaskModel } from '../../../shared/models/tasks.model';
import { DayType } from '../../../shared/const/day-type.const';

@Component({
  selector: 'app-presence-history',
  templateUrl: './presence-history.component.html',
  styleUrls: ['./presence-history.component.scss']
})
export class PresenceHistoryComponent {
  dayTypes = DayType;

  @Input()
  tasks: TaskModel[];

  @Output()
  deleteTask = new EventEmitter<string>();

  @Output()
  approve = new EventEmitter<string>();
}
