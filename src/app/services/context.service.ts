import { EmployeeStoreService } from './../store/employee-store.service';
import { ContextStoreService } from 'src/app/store/context-store.service';
import { EmployeeService } from './employee.service';
import { Injectable } from '@angular/core';
import { EmployeeApiService } from './api/employee-api.service';
import { Router, NavigationStart } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ContextService {
  constructor(
    private employeeApiService: EmployeeApiService,
    private router: Router,
    private contextStoreService: ContextStoreService,
    private employeeStoreService: EmployeeStoreService
  ) {}

  public selectUser(id: number) {
    const user = this.employeeStoreService.getEmployees().find(i => i.id === id);
    this.contextStoreService.setSelectedUser(user);
  }
}
