import { Pipe, PipeTransform } from '@angular/core';
import { EmployeeStoreService } from '../../../core/store/employee-store.service';
import { Employee } from '../../models/employee.model';

@Pipe({
  name: 'currentEmployee'
})
export class CurrentEmployeePipe implements PipeTransform {
  constructor(private employeeStoreService: EmployeeStoreService) {}

  transform(value: string): string {
    const employee = this.employeeStoreService
      .getEmployeesSnapshot()
      .find((emp: Employee) => emp.mailNickname === value);

    if (!employee) {
      return null;
    }
    return `${employee.username.split(' ')[0]} ${employee.username.split(' ')[1][0]}.`;
  }
}
