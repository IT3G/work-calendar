import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { ContextStoreService } from '../../../core/store/context-store.service';
import { TaskModel } from '../../../shared/models/tasks.model';
import { DateConvertService } from '../../../shared/services/date-convert.service';
import { DayTypeGetterService } from '../../../shared/services/day-type-getter.service';
import { HolidaysModel } from '../../../shared/models/holidays.model';
import * as moment from 'moment';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnChanges {
  @Input() tasks: TaskModel[];
  @Input() holidays: HolidaysModel[];

  public selectedDate: NgbDateStruct;

  constructor(
    private contextStoreService: ContextStoreService,
    private dateConvertService: DateConvertService,
    private dayTypeGetterService: DayTypeGetterService
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes.tasks && changes.tasks.currentValue) {
      this.onDateSelect(this.dateConvertService.convertMomentToNgbDate(this.contextStoreService.getCurrentDate()));
    }
  }

  public onDateSelect(date: NgbDateStruct): void {
    this.selectedDate = date;
    const dt = this.dateConvertService.convertNgbDateToMoment(date);
    this.contextStoreService.setCurrentDate(dt);
    this.contextStoreService.setDayType(this.dayTypeGetterService.getDayType(dt, this.tasks));

    const existedTask = this.tasks.find((i) => dt.isSame(i.dateStart, 'day'));
    if (existedTask) {
      this.contextStoreService.setComment(existedTask.comment);
    } else {
      this.contextStoreService.setComment(null);
    }
  }
}
