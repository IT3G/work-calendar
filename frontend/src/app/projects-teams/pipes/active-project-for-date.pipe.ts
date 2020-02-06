import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';
import { DictionaryModel } from '../../shared/models/dictionary.model';
import { Employee } from '../../shared/models/employee.model';
import { ProjectNew } from '../../shared/models/project-new';

@Pipe({
  name: 'activeProjectForDatePipe'
})
export class ActiveProjectForDatePipe implements PipeTransform {
  transform(users: Employee[], date: moment.Moment, project: DictionaryModel): Employee[] {
    if (!users) {
      return [];
    }

    return users.filter(
      u => u.projectsNew && u.projectsNew.some(p => p.project_id === project._id && this.isProjectAtMonth(p, date))
    );
  }

  private isProjectAtMonth(p: ProjectNew, date: moment.Moment): boolean {
    return p.metadata.some(m => moment(`${m.month}-${m.year}`, 'M-YYYY').isSame(date, 'month'));
  }
}
