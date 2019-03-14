import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { Employee } from './../models/employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeStoreService {
  private readonly _employees = new BehaviorSubject<Employee[]>([]);

  readonly employees$ = this._employees.asObservable(); //.pipe(shareReplay(1));

  constructor() {}

  public getEmployees(): Employee[] {
    return this._employees.getValue();
  }

  public addEmployees(val: Employee[]) {
    this._employees.next(val);
  }
}
