import { Component, EventEmitter, AfterViewChecked } from '@angular/core';
import { PrintComponent } from '../../../models/print-component.model';
import { WorkHolidayPrint } from '../../../models/work-holiday-print.model';
import { incline } from 'lvovich';
import * as moment from 'moment';

/** Компонент печатной формы заявления на отпуск */
@Component({
  selector: 'app-work-holiday',
  templateUrl: 'work-holiday.component.html',
  styleUrls: ['work-holiday.component.scss']
})
export class WorkHolidayComponent implements PrintComponent, AfterViewChecked {
  public readyToPrint = new EventEmitter<void>();

  public data: WorkHolidayPrint;

  public ngAfterViewChecked(): void {
    this.readyToPrint.emit();
  }

  public get fioGenitive(): string {
    const [f, i] = this.data.user.username.split(' ');
    const fio = incline({ middle: this.data.user.patronymic, last: f, first: i }, 'genitive');
    return `${fio.last} ${fio.first} ${fio.middle}`;
  }

  public get period(): string {
    const dateStartMoment = moment(this.data.task.dateStart);
    const dateEndMoment = this.data.task.dateEnd && moment(this.data.task.dateEnd);

    const dayAndMonthStart = dateStartMoment.format('D MMMM YYYY г.');
    const dayAndMonthEnd = dateEndMoment && dateEndMoment.format('D MMMM YYYY г.');
    return `с ${dayAndMonthStart} по ${dayAndMonthEnd}`;
  }

  public get daysCount(): number {
    return this.data.task.dateEnd && moment(this.data.task.dateEnd).diff(this.data.task.dateStart, 'days') + 1;
  }

  public get fio(): string {
    return `${this.data.user.username} ${this.data.user.patronymic}`;
  }

  public get nowDate(): string {
    return moment().format('D MMMM YYYY г.');
  }
}
