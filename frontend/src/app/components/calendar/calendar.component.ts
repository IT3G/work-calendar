import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Moment } from 'moment';
import { DayType } from 'src/app/const/day-type.const';
import { TaskModel } from 'src/app/models/tasks.models';
import { DateConvertService } from 'src/app/services/date-convert.service';
import { ContextStoreService } from 'src/app/store/context-store.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  constructor(private contextStoreService: ContextStoreService, private dateConvertService: DateConvertService) {}

  @Input() tasks: TaskModel[];
  @Output() selected = new EventEmitter<Moment>();

  selectedDate: NgbDateStruct;
  // tasksSubscription: Subscription;
  // public hoveredDate: NgbDate;
  // public fromDate: NgbDate;
  // public toDate: NgbDate;
  // currentDate$: Observable<Moment>;

  ngOnInit() {
    this.onDateSelect(this.dateConvertService.convertMomentToNgbDate(this.contextStoreService.getCurrentDate()));
  }

  public onDateSelect(date: NgbDateStruct) {
    this.selectedDate = date;
    const dt = this.dateConvertService.convertNgbDateToMoment(date);
    this.contextStoreService.setCurrentDate(dt);
    this.contextStoreService.setDayType(this.getDayType(dt));

    const existedTask = this.tasks.find(i => dt.isSame(i.dateStart, 'day'));
    if (existedTask) {
      this.contextStoreService.setComment(existedTask.comment);
    } else {
      this.contextStoreService.setComment(null);
    }
  }

  private getDayType(dt: Moment): DayType {
    const existedTask = this.tasks.find(i => dt.isSame(i.dateStart, 'day'));

    let dayType = DayType.COMMON;

    if (existedTask) {
      dayType = existedTask.type;
    } else if (dt.weekday() === 5 || dt.weekday() === 6) {
      dayType = DayType.LEFT;
    }

    return dayType;
  }

  public chooseClass(date: NgbDateStruct): string {
    const dtMoment = this.dateConvertService.convertNgbDateToMoment(date);
    const dayType = DayType[this.getDayType(dtMoment)];
    return `type_${dayType}`;
  }
}
