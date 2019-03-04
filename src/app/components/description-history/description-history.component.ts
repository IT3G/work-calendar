import { filter, map } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { Observable, combineLatest } from 'rxjs';
import { TaskModel } from 'src/app/models/tasks.models';
import { TasksStoreService } from 'src/app/store/tasks-store.service';
import { AgendaColors } from 'src/app/const/agenda-colors.const';
import { DayType } from 'src/app/const/day-type.const';
import * as moment from 'moment';
import { ContextStoreService } from 'src/app/store/context-store.service';

@Component({
  selector: 'app-description-history',
  templateUrl: './description-history.component.html',
  styleUrls: ['./description-history.component.scss']
})
export class DescriptionHistoryComponent implements OnInit {
  tasks$: Observable<TaskModel[]>;
  displayedColumns: string[];
  constructor(private tasksStoreService: TasksStoreService, private contextStoreService: ContextStoreService) {}

  ngOnInit() {
    this.displayedColumns = ['date', 'type', 'comment'];

    const combined = combineLatest(this.tasksStoreService.getTasks$(), this.contextStoreService.getCurrentDate$());
    // TODO: Change date

    this.tasks$ = this.tasksStoreService.getTasks$().pipe(
      map(arr =>
        arr.filter(el => {
          return el.date.isSame(this.contextStoreService.getCurrentDate());
        })
      )
    );
  }

  public getTitle(id: number): string {
    return AgendaColors.find(o => o.id === id).title;
  }
}
