import { Pipe, PipeTransform } from '@angular/core';
import { Moment } from 'moment';
import { Employee } from 'src/app/shared/models/employee.model';
import { NewProjectUtils } from '../../shared/utils/new-project.utils';

@Pipe({
  name: 'usersQuantityBySubdivision'
})
export class UsersQuantityBySubdivisionPipe implements PipeTransform {
  transform(users: Employee[], subdivisionName: string, projectId: string, date: Moment): string {
    if (!users?.length) {
      return '';
    }

    const usersForCurrentSubdivision = users.filter(u => u?.subdivision?.name === subdivisionName);

    if (!usersForCurrentSubdivision.length) {
      return '';
    }

    const usersWithProjectInCurrentMonth = usersForCurrentSubdivision.filter(u =>
      NewProjectUtils.isUserHaveSameOrLastProjectInCurrentMonth(u, date, projectId)
    );

    const summary = usersWithProjectInCurrentMonth
      .map(u => NewProjectUtils.getProjectMetadataByDate(u, date, projectId))
      .reduce((acc, val) => acc + val.percent, 0);

    return `${subdivisionName}: ${summary / 100} ч/м (${usersWithProjectInCurrentMonth.length} чел.)`;
  }
}
