import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ContextStoreService } from 'src/app/store/context-store.service';
import { EmployeeStoreService } from './../store/employee-store.service';
import { EmployeeApiService } from './api/employee-api.service';

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
    const user = this.employeeStoreService.getEmployeesSnapshot().find(i => i.id === id);
    this.contextStoreService.setSelectedUser(user);
  }
}
