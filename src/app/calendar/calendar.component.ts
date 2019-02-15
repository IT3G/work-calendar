import { DayType } from './../shared/const/day-type.const';
import { AgendaColors } from 'src/app/shared/const/agenda-colors.const';
import { TasksStoreService } from './../store/tasks-store.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbCalendar, NgbDate, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { TaskModel } from 'src/app/models/tasks.models';
import { DateConvertService } from 'src/app/shared/services/date-convert.service';
import { ContextStoreService } from 'src/app/store/context-store.service';
import * as moment from 'moment';
import _ from 'lodash';
import { Moment } from 'moment';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  constructor(
    private contextStoreService: ContextStoreService,
    private dateConvertService: DateConvertService,
    private tasksStoreService: TasksStoreService
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
    // this.currentDate$ = this.contextStoreService.getCurrentDate();
    this.contextStoreService
      .getCurrentDate()
      .subscribe(res => (this.selectedDate = this.dateConvertService.convertMomentToNgbDate(res)));
    this.tasksStoreService.tasks$.subscribe(res => {
      this.tasks = res;
    });
  }

  public onDateSelect(date: NgbDateStruct) {
    this.selectedDate = date;
    const dt = this.dateConvertService.convertNgbDateToMoment(date);
    this.contextStoreService.setDateStart(dt);
    console.log('setting type ' + this.getDayType(dt));
    this.contextStoreService.setDateType(this.getDayType(dt));
  }

  dateHasTask(date: NgbDateStruct): boolean {
    const result = this.tasks.find(i => i.date.isSame(this.dateConvertService.convertNgbDateToMoment(date)));
    return !!result;
  }

  getDayType(dt: Moment): DayType {
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
