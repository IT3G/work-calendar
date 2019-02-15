import { Injectable } from '@angular/core';
import { EmployeeStoreService } from './store/employee-store.service';
import { employeeList } from './test-data';

@Injectable({
  providedIn: 'root'
})
export class TestDataService {
  constructor(private employeeStoreService: EmployeeStoreService) {}

  public initTestData() {
    this.employeeStoreService.addEmployees(employeeList);
  }
}
