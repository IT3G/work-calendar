import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Employee } from './../models/employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeStoreService {
  private readonly employees$ = new BehaviorSubject<Employee[]>([]);

  public getEmployeesSnapshot(): Employee[] {
    return this.employees$.value;
  }

  public addEmployees(val: Employee[]): void {
    this.employees$.next(val);
  }

  public getEmployees(): Observable<Employee[]> {
    return this.employees$;
  }
}
