import { Injectable } from '@angular/core';
import { EmployeeStoreService } from 'src/app/store/employee-store.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  constructor(private employeeStoreService: EmployeeStoreService) {}
}
