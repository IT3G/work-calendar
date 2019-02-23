import { Injectable } from '@angular/core';
import { EmployeeApiService } from './services/employee-api.service';
import { ContextStoreService } from './store/context-store.service';
import { EmployeeStoreService } from './store/employee-store.service';

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
      this.employeeApiService.load();
      this.contextStoreService.setCurrentUser(this.employeeStoreService.getEmployees()[0]);
      this.contextStoreService.setSelectedUser(this.employeeStoreService.getEmployees()[0]);

      // APP_SETTINGS.connectionString = settings[0].value;

      resolve();

      // setTimeout(() => {
      //   console.log(`initializeApp:: inside setTimeout`);

      //   resolve();
      // }, 3000);
    });
  }
}
