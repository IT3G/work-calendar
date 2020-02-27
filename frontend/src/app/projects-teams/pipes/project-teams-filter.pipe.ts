import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';
import { ProjectNew } from '../../shared/models/project-new';
import { NewProjectUtils } from '../../shared/utils/new-project.utils';
import { ProjectTeamsFilterModel } from '../project-teams-filter/project-teams-filter.component';
import { ProjectData } from '../projects-teams/projects-teams.component';

@Pipe({
  name: 'projectTeamsFilter'
})
export class ProjectTeamsFilterPipe implements PipeTransform {
  transform(projectsData: ProjectData[], filter: ProjectTeamsFilterModel): ProjectData[] {
    if (!projectsData) {
      return [];
    }

    if (!filter) {
      return projectsData;
    }

    const undefinedValue = 'undefined-value';
    const allItems = 'all-items';

    const activeProjectsData = projectsData
      .map(prjData => {
        const usersForProject = prjData.users.filter(
          u =>
            u.projectsNew &&
            u.projectsNew.some(p => p.project_id === prjData.projectID && this.isProjectAtMonth(p, filter.month))
        );

        return { ...prjData, users: usersForProject };
      })
      .filter(item => item.users && item.users.length);

    if (filter.subdivision === allItems) {
      return activeProjectsData;
    }

    if (filter.subdivision === undefinedValue) {
      return activeProjectsData.map(project => {
        const usersWithoutSubdivision = project.users.filter(user => !user.subdivision);

        return { ...project, users: usersWithoutSubdivision };
      });
    }

    return activeProjectsData.map(project => {
      const filteredUsers = project.users.filter(user => {
        return user.subdivision && user.subdivision.name && user.subdivision.name === filter.subdivision;
      });

      return { ...project, users: filteredUsers };
    });
  }

  private isProjectAtMonth(p: ProjectNew, date: moment.Moment): boolean {
    return p.metadata.some(m => NewProjectUtils.mapMetadataToDate(m).isSame(date, 'month'));
  }
}
