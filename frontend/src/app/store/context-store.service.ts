import { Injectable } from '@angular/core';
import { Moment } from 'moment';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { DayType } from '../const/day-type.const';
import { Employee } from '../models/employee.model';

@Injectable({ providedIn: 'root' })
export class ContextStoreService {
  private currentUser = new BehaviorSubject<Employee>(null);
  private selectedUser = new BehaviorSubject<Employee>(null);
  private currentDate = new BehaviorSubject<Moment>(null);
  private dayType = new BehaviorSubject<DayType>(null);
  private comment = new BehaviorSubject<string>(null);

  constructor() {}

  public getCurrentDate$(): Observable<Moment> {
    return this.currentDate;
  }

  public getCurrentDate(): Moment {
    return this.currentDate.value;
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

  public getComment$(): Observable<string> {
    return this.comment;
  }

  public setComment(comment: string) {
    this.comment.next(comment);
  }

  public getCurrentUser$(): Observable<Employee> {
    return this.currentUser;
  }

  public getCurrentUser(): Employee {
    return this.currentUser.value;
  }

  public isCurrentUserAdmin$(): Observable<boolean> {
    return this.currentUser.pipe(
      filter(user => !!user),
      map((user: Employee) => user.isAdmin)
    );
  }

  public setCurrentUser(user: Employee) {
    this.currentUser.next(user);
  }

  // public getSelectedUser$(): Observable<Employee> {
  //   return this.selectedUser;
  // }

  // public getSelectedUser(): Employee {
  //   return this.selectedUser.value;
  // }

  // public setSelectedUser(user: Employee) {
  //   this.selectedUser.next(user);
  // }
}
