import { DayType } from './../shared/const/day-type.const';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { Moment } from 'moment';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ContextStoreService {
  private currentDate = new BehaviorSubject<Moment>(moment()); // Текущая дата

  private dayType = new BehaviorSubject<DayType>(DayType.COMMON); // Стандартно

  constructor() {}

  public setDateStart(date: Moment) {
    this.currentDate.next(date);
  }

  public setDateType(dayType: DayType) {
    this.dayType.next(dayType);
  }

  public getCurrentDate(): Observable<Moment> {
    return this.currentDate;
  }

  public getDayType(): Observable<DayType> {
    return this.dayType;
  }
}
