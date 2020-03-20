import { Pipe, PipeTransform } from '@angular/core';
import { Moment } from 'moment';
import { Employee } from 'src/app/shared/models/employee.model';

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

    const month = +date.format('M');
    const year = +date.format('YYYY');

    const userDetails = usersForCurrentSubdivision.map(user => {
      const project = user.projectsNew.find(p => p.project_id === projectId);
      if (!project) {
        return user.lastProjects.find(p => p.project_id === projectId);
      }
      return project.metadata.find(m => m.month === month && m.year === year);
    });
    const summary = userDetails.filter(p => !!p).reduce((acc, val) => acc + val.percent, 0);

    return `${subdivisionName}: ${usersForCurrentSubdivision.length} - ${summary / 100} ч;`;
  }
}
