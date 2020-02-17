import { Component, Input, OnInit } from '@angular/core';

interface DateCalendar {
  year: string;
  month: number;
}

export enum NamesOfMonth {
  'Январь' = 1,
  'Февраль',
  'Март',
  'Апрель',
  'Май',
  'Июнь',
  'Июль',
  'Август',
  'Сентябрь',
  'Октябрь',
  'Ноябрь',
  'Декабрь'
}

@Component({
  selector: 'app-calendar-block',
  templateUrl: './calendar-block.component.html',
  styleUrls: ['./calendar-block.component.scss']
})
export class CalendarBlockComponent implements OnInit {
  @Input()
  days: string;

  @Input()
  date?: DateCalendar;

  public daysInMonth: number[];

  constructor() {}

  ngOnInit() {
    this.daysInMonth = this.getDaysInMonth(this.date);
  }

  public getDayNumber(): string {
    if (!this.date) {
      return '1';
    }
    const date = new Date(`${this.date.year}-${this.date.month}-01`);
    const dayNumber = date.getDay();
    return dayNumber === 0 ? '7' : `${dayNumber}`;
  }

  public getMonthName(month: number) {
    return NamesOfMonth[month];
  }

  public getDateOfMonth(year: string, month: number): string {
    return `${year}-${month}-01`;
  }

  public getDaysInMonth(date: DateCalendar): number[] {
    const days = new Date(Number(date.year), date.month, 0).getDate();
    return new Array(days - 1).fill(0).map((x, i) => i + 2);
  }

  public isHoliday(day: number): boolean {
    return this.prepareDaysArr(this.days).includes(`${day}`);
  }

  public isPreHoliday(day: number): boolean {
    return this.prepareDaysArr(this.days).includes(`${day}*`);
  }

  public prepareDaysArr(data: string) {
    return data.split(',');
  }

  public getTitle(day: number): string {
    if (this.isHoliday(day)) {
      return 'Выходной день';
    }
    if (this.isPreHoliday(day)) {
      return 'Предпраздничный день';
    }
    return 'Рабочий день';
  }
}
