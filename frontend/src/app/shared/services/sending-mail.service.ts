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
      // взяли всех пользователей и для каждого делаем:
      emp =>
        (emp.projects
            // выбрали проекты, активные на текущий момент
          .filter(p => {
            p.dateStart = p.dateStart ? p.dateStart : moment('1900-01-01').format();
            p.dateEnd = p.dateEnd ? p.dateEnd : moment('2100-01-01').format();
            return moment().isBetween(p.dateStart, p.dateEnd);
          })
            // из активных проектов сравнили каждый с:
          .some((projectEmp: { project: string; dateStart: string; dateEnd: string }) => {

            return selectedUser.projects
              // у выбранного пользователя отфильтровали активные на текущий момент
              .filter(p => {
                p.dateStart = p.dateStart ? p.dateStart : moment('1900-01-01').format();
                p.dateEnd = p.dateEnd ? p.dateEnd : moment('2100-01-01').format();
                return moment().isBetween(p.dateStart, p.dateEnd);
              })
              // проверили совпадение активных проектов для проекта у пользователя и активного пользователя
              .some(project => project.project === projectEmp.project);
          }) ||
          !emp.projects.length) &&
        emp.hasMailing
    );
  }
}
