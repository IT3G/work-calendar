import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { NgbDate, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Moment } from 'moment';
import { Observable } from 'rxjs';
import { TaskModel } from 'src/app/models/tasks.models';
import { TaskApiService } from 'src/app/services/api/task-api.service';
import { DateConvertService } from 'src/app/services/date-convert.service';
import { TasksService } from 'src/app/services/tasks.service';
import { ContextStoreService } from 'src/app/store/context-store.service';
import { TasksStoreService } from 'src/app/store/tasks-store.service';
import { AppRoutingModule } from '../../app-routing.module';
import { DayType } from 'src/app/const/day-type.const';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  constructor(
    private contextStoreService: ContextStoreService,
    private dateConvertService: DateConvertService,
    private tasksStoreService: TasksStoreService,
    private router: Router,
    private teaksService: TasksService,
    private taskApiService: TaskApiService
  ) {}

  @Input() task: TaskModel;
  @Output() selected = new EventEmitter<Moment>();

  selectedDate: NgbDateStruct;
  public tasks: TaskModel[];

  public hoveredDate: NgbDate;

  public fromDate: NgbDate;
  public toDate: NgbDate;

  currentDate$: Observable<Moment>;

  ngOnInit() {
    this.taskApiService.loadTasks(this.contextStoreService.getSelectedUser());

    this.tasksStoreService.getTasks$().subscribe(res => {
      this.tasks = res;
      this.onDateSelect(this.dateConvertService.convertMomentToNgbDate(this.contextStoreService.getCurrentDate()));
    });
  }

  public onDateSelect(date: NgbDateStruct) {
    this.selectedDate = date;
    const dt = this.dateConvertService.convertNgbDateToMoment(date);
    this.contextStoreService.setCurrentDate(dt);
    this.contextStoreService.setDayType(this.getDayType(dt));

    const existedTask = this.tasks.find(i => i.date.isSame(dt));
    if (existedTask) {
      this.contextStoreService.setComment(existedTask.comment);
    } else {
      this.contextStoreService.setComment(null);
    }
  }

  dateHasTask(date: NgbDateStruct): boolean {
    const result = this.tasks.find(i => i.date.isSame(this.dateConvertService.convertNgbDateToMoment(date)));
    return !!result;
  }

  getDayType(dt: Moment): DayType {
    if (this.tasks.length) {
    }
    const existedTask = this.tasks.find(i => i.date.isSame(dt));

    let dayType = DayType.COMMON;

    if (existedTask) {
      dayType = existedTask.type;
    } else if (dt.weekday() === 5 || dt.weekday() === 6) {
      dayType = DayType.LEFT;
    }

    return dayType;
  }

  chooseClass(date: NgbDateStruct): string {
    const dt = this.dateConvertService.convertNgbDateToMoment(date);
    const dayType = DayType[this.getDayType(dt)];
    return `type_${dayType}`;
  }
}
