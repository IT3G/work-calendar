import { Pipe, PipeTransform } from '@angular/core';
import { Moment } from 'moment';
import { ProjectDataModel } from '../models/project-data.model';

@Pipe({
  name: 'usersQuantityByProject'
})
export class UsersQuantityByProjectPipe implements PipeTransform {
  transform(project: ProjectDataModel, date: Moment): string {
    const month = +date.format('M');
    const year = +date.format('YYYY');
    const users = project.users;
    const projectId = project.projectId;
    const projectUserDetails = users.map(user => {
      const projectInfo = user.projectsNew.find(p => p.project_id === projectId);
      if (!projectInfo) {
        return user.lastProjects.find(p => p.project_id === projectId);
      }
      return projectInfo.metadata.find(m => m.month === month && m.year === year);
    });
    const summary = projectUserDetails.filter(p => !!p).reduce((acc, val) => acc + val.percent, 0);

    return `${summary / 100} (${project.users.length} чел.)`;
  }
}
