import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Employee } from '../../shared/models/employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeStoreService {
  private readonly employees$ = new BehaviorSubject<Employee[]>([]);
  private updateEmitter$ = new Subject();

  public getEmployeesSnapshot(): Employee[] {
    return this.employees$.value;
  }

  public addEmployees(val: Employee[]): void {
    this.employees$.next(val);
  }

  public getEmployees(): Observable<Employee[]> {
    return this.employees$;
  }

  public update(): void {
    this.updateEmitter$.next();
  }

  public updater(): Subject<any> {
    return this.updateEmitter$;
  }
}
