import { Pipe, PipeTransform } from '@angular/core';

import * as moment from 'moment';

import { NewProjectUtils } from '../../shared/utils/new-project.utils';
import { ProjectDataModel } from '../models/project-data.model';
import { TeamsFilterModel } from '../projects-teams/teams-filters/teams-filters.component';

@Pipe({
  name: 'projectTeamsFilter',
  pure: true,
})
export class ProjectTeamsFilterPipe implements PipeTransform {
  transform(projectsData: ProjectDataModel[], filter: TeamsFilterModel): ProjectDataModel[] {
    if (!projectsData) {
      return [];
    }

    const activeProjectsData = projectsData
      .map((prjData) => {
        const usersForProject = prjData.users
          .filter((u) => !!u)
          .filter((u) => !u.terminationDate || filter.month.isSameOrBefore(moment(u.terminationDate), 'month'))
          .filter((u) => NewProjectUtils.isUserHaveSameOrLastProjectInCurrentMonth(u, filter.month, prjData.projectId));

        return { ...prjData, users: usersForProject };
      })
      .map((prjData) => {
        if (filter.location) {
          const filtredLocation = prjData.users.filter((user) => user.location === filter.location);
          return { ...prjData, users: filtredLocation };
        }
        return prjData;
      })
      .filter((prjData) => {
        if (filter.project) {
          return prjData.projectName === filter.project;
        }
        return prjData;
      })
      .map((prjData) => {
        if (filter.name) {
          const filtredLocation = prjData.users.filter((user) => {
            return user.username.indexOf(filter.name) !== -1;
          });
          return { ...prjData, users: filtredLocation };
        }
        return prjData;
      });

    return activeProjectsData;
  }
}
