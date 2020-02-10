import { Component, OnInit, Input } from '@angular/core';
import { TaskModel } from '../../../shared/models/tasks.models';

@Component({
  selector: 'app-presence-history',
  templateUrl: './presence-history.component.html',
  styleUrls: ['./presence-history.component.scss']
})
export class PresenceHistoryComponent {
  @Input()
  tasks: TaskModel[];

}
