import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { combineLatest, Observable, Subscription } from 'rxjs';
import { ContextStoreService } from '../../../core/store/context-store.service';
import { EmployeeStoreService } from '../../../core/store/employee-store.service';
import { TaskModel } from '../../../shared/models/tasks.models';
import { TaskMapperService } from '../../../shared/services/task-mapper.service';
import { el } from '@angular/platform-browser/testing/src/browser_util';
import { SendingTaskModel } from '../../../shared/models/sending-task.model';
import * as moment from 'moment';

@Component({
  selector: 'app-description-history',
  templateUrl: './description-history.component.html',
  styleUrls: ['./description-history.component.scss']
})
export class DescriptionHistoryComponent implements OnInit, OnDestroy {
  @Input() tasks: TaskModel[];

  public filteredTasks: SendingTaskModel[];
  private tasksSubscription = new Subscription;

  constructor(
    private contextStoreService: ContextStoreService,
    private taskService: TaskMapperService,
  ) {}

  ngOnInit() {
    this.getInfoFromStore();
  }

  ngOnDestroy(): void {
    this.tasksSubscription.unsubscribe();
  }

  private getInfoFromStore() {
    this.tasksSubscription.add(
      this.contextStoreService.getCurrentDate$().subscribe((res) => {
        this.filteredTasks = this.tasks
          .filter(item => item.dateStart.isSame(res))
          .map(element => this.taskService.mapToSendingModel(element));
      })
    );
  }
}
