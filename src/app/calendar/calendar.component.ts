import { Component, OnInit } from '@angular/core';
import { NgbCalendar, NgbDate, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { TasksModel } from 'src/app/models/tasks.models';
import { DateConvertService } from 'src/app/shared/services/date-convert.service';
import { DatesStoreService } from 'src/app/store/dates-store.service';
import { StateService } from './../state.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  constructor(
    private datesStoreService: DatesStoreService,
    private calendar: NgbCalendar,
    private dateConvertService: DateConvertService
  ) {}

  public model: NgbDateStruct;
  public tasks: TasksModel[];
  public stateService: StateService;

  public hoveredDate: NgbDate;

  public fromDate: NgbDate;
  public toDate: NgbDate;
  getCurrentDate$: Observable<any>;
  now = new Date();

  ngOnInit() {
    this.selectToday();
    this.getCurrentDate$ = this.datesStoreService.getDateStart();
    this.getInfoFromStore();
  }

  private getInfoFromStore() {
    this.getCurrentDate$.subscribe(res => (this.model = this.dateConvertService.convertMomentToNgbDate(res)));

    this.datesStoreService.getTasks().subscribe(res => (this.tasks = res));
  }

  public selectToday() {
    this.model = {
      year: this.now.getFullYear(),
      month: this.now.getMonth() + 1,
      day: this.now.getDate()
    };
  }

  public isWeekend(date: NgbDateStruct) {
    const d = new Date(date.year, date.month - 1, date.day);
    return d.getDay() === 0 || d.getDay() === 6;
  }

  public isDisabled(date: NgbDateStruct, current: { month: number }) {
    return date.month !== current.month;
  }

  public hasTask(date: NgbDateStruct) {
    return this.dateHasTask(date);
  }

  public onDateSelect(date: NgbDateStruct) {
    this.model = date;
    this.datesStoreService.setDateStart(this.dateConvertService.convertNgbDateToMoment(date));
    this.datesStoreService.setDateEnd(null);
  }

  dateHasTask(date: NgbDateStruct): boolean {
    const result = this.tasks.find(i =>
      moment(i.dateStart).isSame(this.dateConvertService.convertNgbDateToMoment(date))
    );
    return !!result;
  }

  chooseClass(date: NgbDateStruct): string {
    const result = this.tasks.find(i =>
      moment(i.dateStart).isSame(this.dateConvertService.convertNgbDateToMoment(date))
    );

    const styleClass = result ? `type_${result.id}` : '';
    return styleClass;
  }
}
