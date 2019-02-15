import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { Moment } from 'moment';
import { BehaviorSubject, Observable } from 'rxjs';
import { DayType } from './../shared/const/day-type.const';

@Injectable({ providedIn: 'root' })
export class ContextStoreService {
  private currentUser = new BehaviorSubject<string>('Друг');
  private currentDate = new BehaviorSubject<Moment>(moment());
  private dayType = new BehaviorSubject<DayType>(DayType.COMMON);

  constructor() {}

  public getCurrentDate(): Observable<Moment> {
    return this.currentDate;
  }

  public setCurrentDate(date: Moment) {
    this.currentDate.next(date);
  }

  public getDayType(): Observable<DayType> {
    return this.dayType;
  }

  public setDayType(dayType: DayType) {
    this.dayType.next(dayType);
  }

  public getCurrentUser(): Observable<string> {
    return this.currentUser;
  }

  public setCurrentUser(user: string) {
    this.currentUser.next(user);
  }
}
