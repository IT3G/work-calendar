import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { ContextStoreService } from '../../core/store/context-store.service';
import { EmployeeStoreService } from '../../core/store/employee-store.service';
import { Employee } from '../models/employee.model';

@Injectable({ providedIn: 'root' })
export class SendingMailService {
  constructor(private employeeStoreService: EmployeeStoreService, private contextStoreService: ContextStoreService) {}

  filterEmployee(selectedUser: Employee) {
    return this.employeeStoreService.getEmployeesSnapshot().filter(
      emp =>
        (emp.projects
          .filter(p => {
            p.dateStart = p.dateStart ? p.dateStart : moment('1900-01-01').format();
            p.dateEnd = p.dateEnd ? p.dateEnd : moment('2100-01-01').format();
            return moment().isBetween(p.dateStart, p.dateEnd);
          })

          .some((projectEmp: { project: string; dateStart: string; dateEnd: string }) => {
            return selectedUser.projects
              .filter(p => {
                p.dateStart = p.dateStart ? p.dateStart : moment('1900-01-01').format();
                p.dateEnd = p.dateEnd ? p.dateEnd : moment('2100-01-01').format();
                return moment().isBetween(p.dateStart, p.dateEnd);
              })
              .some(project => project.project === projectEmp.project);
          }) ||
          !emp.projects.length) &&
        emp.hasMailing
    );
  }
}
