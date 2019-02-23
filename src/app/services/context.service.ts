import { EmployeeService } from './../shared/services/employee.service';
import { Injectable } from '@angular/core';
import { EmployeeApiService } from './employee-api.service';

@Injectable({
  providedIn: 'root'
})
export class ContextService {
  constructor(private employeeApiService: EmployeeApiService) {}
}
