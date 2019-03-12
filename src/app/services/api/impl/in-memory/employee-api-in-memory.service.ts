import { Injectable } from '@angular/core';
import { EmployeeApiService } from '../../employee-api.service';
import { Employee } from 'src/app/models/employee.model';
import { EmployeeStoreService } from 'src/app/store/employee-store.service';
import { ContextStoreService } from 'src/app/store/context-store.service';

const guestUser: Employee = {
  id: 0,
  name: 'Г',
  surname: 'Гость'
};

const employeeList: Employee[] = [
  guestUser,
  {
    id: 1,
    name: 'Андрей',
    surname: 'Ковалев'
  },
  {
    id: 2,
    name: 'Климент',
    surname: 'Рудниченко'
  },
  {
    id: 3,
    name: 'Дмитрий',
    surname: 'Глотов'
  }
];

@Injectable({
  providedIn: 'root'
})
export class EmployeeApiInMemoryService implements EmployeeApiService {
  constructor(private employeeStoreService: EmployeeStoreService, private contextStoreService: ContextStoreService) {}

  load() {
    this.employeeStoreService.addEmployees(employeeList);
    console.log('context loaded');
  }
}
