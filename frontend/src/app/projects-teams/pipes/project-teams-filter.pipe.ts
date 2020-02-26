import { Pipe, PipeTransform } from '@angular/core';
import { Employee } from '../../shared/models/employee.model';
import * as moment from 'moment';
import { ProjectNew } from '../../shared/models/project-new';
import { NewProjectUtils } from '../../shared/utils/new-project.utils';
import { ProjectTeamsFilterModel } from '../project-teams-filter/project-teams-filter.component';

@Pipe({
  name: 'projectTeamsFilter'
})
export class ProjectTeamsFilterPipe implements PipeTransform {
  transform(users: Employee[], filter: ProjectTeamsFilterModel, projectId: string): Employee[] {
    if (!users) {
      return [];
    }

    if (!filter) {
      return users;
    }

    const undefinedValue = 'undefined-value';
    const allItems = 'all-items';

    const usersForProject = users.filter(
      u =>
        u.projectsNew && u.projectsNew.some(p => p.project_id === projectId && this.isProjectAtMonth(p, filter.month))
    );

    if (filter.subdivision === allItems) {
      return usersForProject;
    }

    if (filter.subdivision === undefinedValue) {
      return usersForProject.filter(u => !u.subdivision);
    }

    return usersForProject.filter(u => {
      return u.subdivision && u.subdivision.name && u.subdivision.name === filter.subdivision;
    });
  }

  private isProjectAtMonth(p: ProjectNew, date: moment.Moment): boolean {
    return p.metadata.some(m => NewProjectUtils.mapMetadataToDate(m).isSame(date, 'month'));
  }
}
