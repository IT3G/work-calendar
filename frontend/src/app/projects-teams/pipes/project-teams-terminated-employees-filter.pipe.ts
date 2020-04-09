import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';
import { Moment } from 'moment';
import { Employee } from 'src/app/shared/models/employee.model';
import { ProjectTeamsFilterModel } from '../../shared/components/project-teams-filter/project-teams-filter.component';
import { ProjectDataModel } from '../models/project-data.model';

@Pipe({
  name: 'projectTeamsTerminatedEmployeesFilter'
})
export class ProjectTeamsTerminatedEmployeesFilterPipe implements PipeTransform {
  transform(projectsData: ProjectDataModel[], filter: ProjectTeamsFilterModel): ProjectDataModel[] {
    if (!projectsData) {
      return [];
    }

    if (!filter) {
      return projectsData;
    }

    const startOfMonth = filter.month.clone().startOf('month');

    return projectsData.map(project => {
      return {
        ...project,
        users: project.users.filter(employee => this.filterTerminatedEmployeesByStartOfMonth(employee, startOfMonth))
      };
    });
  }

  /** Отсеять сотрудников, уволившихся до начала выбранного месяца */
  private filterTerminatedEmployeesByStartOfMonth(employee: Employee, startOfMonth: Moment): boolean {
    if (!employee.terminationDate) {
      return true;
    }
    const employeeTerminationDate = moment(employee.terminationDate);
    return startOfMonth.isBefore(employeeTerminationDate);
  }
}
