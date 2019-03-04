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
  ) {
    // console.log('constructed');
    // router.events.pipe(/*filter(event => event instanceof NavigationStart)*/).subscribe((
    //   event /*: NavigationStart*/
    // ) => {
    //   // You only receive NavigationStart events
    //   console.log(event);
    // });
  }

  public selectUser(id: number) {
    const user = this.employeeStoreService.getEmployees().find(i => i.id === id);
    console.log('fond');
    console.log(typeof id);
    this.contextStoreService.setSelectedUser(user);
  }
}
