import { Pipe, PipeTransform } from '@angular/core';
import { Moment } from 'moment';
import { NewProjectUtils } from '../../shared/utils/new-project.utils';
import { ProjectDataModel } from '../models/project-data.model';

@Pipe({
  name: 'usersQuantityByProject'
})
export class UsersQuantityByProjectPipe implements PipeTransform {
  transform(project: ProjectDataModel, date: Moment): string {
    const users = project.users;
    const projectId = project.projectId;

    const usersWithProjectInCurrentMonth = users.filter(u =>
      NewProjectUtils.isUserHaveSameOrLastProjectInCurrentMonth(u, date, projectId)
    );

    const summary = usersWithProjectInCurrentMonth
      .map(u => NewProjectUtils.getProjectMetadataByDate(u, date, projectId))
      .reduce((acc, val) => acc + val.percent, 0);

    return `${summary / 100} ч/м (${usersWithProjectInCurrentMonth.length} чел.)`;
  }
}
