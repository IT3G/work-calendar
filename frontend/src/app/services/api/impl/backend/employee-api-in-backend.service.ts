import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee } from 'src/app/models/employee.model';
import { ContextStoreService } from 'src/app/store/context-store.service';
import { EmployeeStoreService } from 'src/app/store/employee-store.service';
import { EmployeeApiService } from '../../employee-api.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeeApiInBackendService implements EmployeeApiService {
  constructor(
    private http: HttpClient,
    private employeeStoreService: EmployeeStoreService,
    private contextStoreService: ContextStoreService
  ) {}

  public loadAllEmployees() {
    return this.http.get('backend/users');
  }

  public searchUserByLogin(usernameString: string) {
    return this.http.get(`backend/users/login/${usernameString}`);
  }

  public searchUserById(id: string) {
    return this.http.get(`backend/users/id/${id}`);
  }

  public updateUserInfo(formValue: Employee) {
    //     this.db
    //       .collection('users')
    //       .doc(formVal._id)
    //       .update({
    //         projects: formVal.projects,
    //         location: formVal.location,
    //         phoneNumber: formVal.telNumber,
    //         isAdmin: formVal.isAdmin
    //       })
    //       .catch(error => console.log('Error while updating the profile', error));
  }
}
