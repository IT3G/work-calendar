import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ContextStoreService } from '../../../core/store/context-store.service';
import { SendingTaskModel } from '../../../shared/models/sending-task.model';
import { TaskModel } from '../../../shared/models/tasks.models';
import { TaskMapperService } from '../../../shared/services/task-mapper.service';

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
