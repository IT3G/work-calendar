import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { ContextStoreService } from '../store/context-store.service';
import { EmployeeStoreService } from '../store/employee-store.service';
import { EmployeeApiService } from './api/employee-api.service';

@Injectable()
export class AppLoadService {
  constructor(
    private employeeApiService: EmployeeApiService,
    private employeeStoreService: EmployeeStoreService,
    private contextStoreService: ContextStoreService
  ) {}

  initializeApp(): Promise<any> {
    return new Promise((resolve, reject) => {
      console.log(`initializeApp:: inside promise`);

      // TODO: Observable pipe
      this.employeeApiService.load();
      this.contextStoreService.setCurrentUser(this.employeeStoreService.getEmployeesSnapshot()[0]);
      this.contextStoreService.setSelectedUser(this.employeeStoreService.getEmployeesSnapshot()[0]);
      this.contextStoreService.setCurrentDate(moment().startOf('day'));
      // APP_SETTINGS.connectionString = settings[0].value;

      // resolve();

      setTimeout(() => {
        console.log(`initializeApp:: inside setTimeout`);
        resolve();
      }, 100);
    });
  }
}
