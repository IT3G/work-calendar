import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { Moment } from 'moment';
import { BehaviorSubject, Observable } from 'rxjs';
import { Employee } from '../models/employee.model';
import { DayType } from '../const/day-type.const';

@Injectable({ providedIn: 'root' })
export class ContextStoreService {
  private currentUser = new BehaviorSubject<Employee>(null);
  private selectedUser = new BehaviorSubject<Employee>(null);
  private currentDate = new BehaviorSubject<Moment>(moment().startOf('day'));
  private dayType = new BehaviorSubject<DayType>(DayType.COMMON);

  constructor() {}

  public getCurrentDate$(): Observable<Moment> {
    return this.currentDate;
  }

  public getCurrentDate(): Moment {
    return this.currentDate.getValue();
  }

  public setCurrentDate(date: Moment) {
    this.currentDate.next(date);
  }

  public getDayType$(): Observable<DayType> {
    return this.dayType;
  }

  public setDayType(dayType: DayType) {
    this.dayType.next(dayType);
  }

  public getCurrentUser$(): Observable<Employee> {
    return this.currentUser;
  }

  public getCurrentUser(): Employee {
    return this.currentUser.getValue();
  }

  public setCurrentUser(user: Employee) {
    this.currentUser.next(user);
  }

  public getSelectedUser$(): Observable<Employee> {
    return this.selectedUser;
  }

  public getSelectedUser(): Employee {
    return this.selectedUser.getValue();
  }

  public setSelectedUser(user: Employee) {
    this.selectedUser.next(user);
  }
}
