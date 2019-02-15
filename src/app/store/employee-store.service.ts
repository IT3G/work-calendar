import { employeeList } from './test-data';
import { shareReplay } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { Employee } from './../models/employee.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmployeeStoreService {
  private readonly _employees = new BehaviorSubject<Employee[]>([]);

  readonly employees$ = this._employees.asObservable().pipe(shareReplay(1));

  constructor() {
    this._employees.next(employeeList);
  }

  get employees(): Employee[] {
    return this._employees.getValue();
  }

  set employees(val: Employee[]) {
    this._employees.next(val);
  }
}
