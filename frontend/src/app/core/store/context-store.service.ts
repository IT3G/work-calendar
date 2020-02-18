import { Injectable } from '@angular/core';
import { Moment } from 'moment';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { DayType } from '../../shared/const/day-type.const';
import { Employee } from '../../shared/models/employee.model';
import { AuthSetting } from '../../shared/models/auth-setting.model';
import { EmployeeProject } from 'src/app/shared/models/employee-project.model';
import { DictionaryModel } from 'src/app/shared/models/dictionary.model';
import { ProjectStatsMetadataNew } from 'src/app/shared/models/project-new';
import * as moment from 'moment';

@Injectable({ providedIn: 'root' })
export class ContextStoreService {
  private currentUser = new BehaviorSubject<Employee>(null);
  private currentDate = new BehaviorSubject<Moment>(null);
  private dayType = new BehaviorSubject<DayType>(null);
  private comment = new BehaviorSubject<string>(null);

  public settings$ = new BehaviorSubject<AuthSetting>(null);
  private updateEmitter$ = new Subject();

  public getCurrentDate$(): Observable<Moment> {
    return this.currentDate.asObservable().pipe(map(currentDate => moment(currentDate)));
  }

  public getCurrentDate(): Moment {
    return moment(this.currentDate.value);
  }

  public setCurrentDate(date: Moment) {
    this.currentDate.next(moment(date));
  }

  public getDayType$(): Observable<DayType> {
    return this.dayType.asObservable();
  }

  public setDayType(dayType: DayType) {
    this.dayType.next(dayType);
  }

  public getComment$(): Observable<string> {
    return this.comment.asObservable();
  }

  public setComment(comment: string) {
    this.comment.next(comment);
  }

  public getCurrentUser$(): Observable<Employee> {
    return this.currentUser.asObservable().pipe(map(this.getNewEmployeeState));
  }

  public getCurrentUser(): Employee {
    return this.getNewEmployeeState(this.currentUser.value);
  }

  public isCurrentUserAdmin$(): Observable<boolean> {
    return this.currentUser.asObservable().pipe(
      filter(user => !!user),
      map((user: Employee) => user.isAdmin)
    );
  }

  public setCurrentUser(user: Employee): void {
    this.currentUser.next(this.getNewEmployeeState(user));
  }

  public update(): void {
    this.updateEmitter$.next();
  }

  public updater(): Observable<unknown> {
    return this.updateEmitter$.asObservable();
  }

  /** получить новое состояние Профиля, безопсное для мутаций */
  private getNewEmployeeState(employee?: Employee): Employee | null {
    if (!employee) {
      return null;
    }

    const projects = employee.projects && employee.projects.map(project => <EmployeeProject>{ ...project });

    const subdivision =
      employee.subdivision && <DictionaryModel>{ _id: employee.subdivision._id, name: employee.subdivision.name };

    const jobPosition =
      employee.jobPosition && <DictionaryModel>{ _id: employee.jobPosition._id, name: employee.jobPosition.name };

    const projectsNew =
      employee.projectsNew &&
      employee.projectsNew.map(projectNew => {
        const metadata =
          projectNew.metadata && projectNew.metadata.map(metadataItem => <ProjectStatsMetadataNew>{ ...metadataItem });
        return { ...projectNew, metadata };
      });

    return { ...employee, projects, subdivision, jobPosition, projectsNew };
  }
}
