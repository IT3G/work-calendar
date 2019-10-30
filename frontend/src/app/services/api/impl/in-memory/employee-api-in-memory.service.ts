import { Injectable } from '@angular/core';
import { ContextStoreService } from 'src/app/store/context-store.service';
import { EmployeeStoreService } from 'src/app/store/employee-store.service';

// const employeeList: Employee[] = [
//   {
//     _id: '1',
//     username: 'Андрей Ковалев',
//     login: 'string',
//     location: 'string',
//     projects: [],
//     isAdmin: false
//   },
//   {
//     _id: '2',
//     username: 'Климент Рудниченко',
//     mailNickname: 'string',
//     location: 'string',
//     projects: [],
//     isAdmin: false
//   },
//   {
//     _id: '3',
//     username: 'Дмитрий Глотов',
//     login: 'string',
//     location: 'string',
//     projects: [],
//     isAdmin: false
//   }
// ];

@Injectable({
  providedIn: 'root'
})
export class EmployeeApiInMemoryService {
  constructor(private employeeStoreService: EmployeeStoreService, private contextStoreService: ContextStoreService) {}

  load() {
    // this.employeeStoreService.addEmployees(employeeList);
    console.log('orig context loaded');
  }
}
