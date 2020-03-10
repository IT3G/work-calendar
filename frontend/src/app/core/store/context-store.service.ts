import { Injectable } from '@angular/core';
import { Moment } from 'moment';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { DayType } from '../../shared/const/day-type.const';
import { AuthSetting } from '../../shared/models/auth-setting.model';
import { Employee } from '../../shared/models/employee.model';

@Injectable({ providedIn: 'root' })
export class ContextStoreService {
  public settings$ = new BehaviorSubject<AuthSetting>(null);

  private currentUser = new BehaviorSubject<Employee>(null);
  private currentDate = new BehaviorSubject<Moment>(null);
  private dayType = new BehaviorSubject<DayType>(null);
  private comment = new BehaviorSubject<string>(null);

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

  public setCurrentUser(user: Employee): void {
    this.currentUser.next(user);
  }
}
