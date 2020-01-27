import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';
import { Employee } from '../../shared/models/employee.model';
import { DictionaryModel } from '../../shared/models/dictionary.model';

@Pipe({
  name: 'activeProjectForDatePipe'
})
export class ActiveProjectForDatePipe implements PipeTransform {

  transform(users: Employee[], date: moment.Moment, project: DictionaryModel): Employee[] {
    const year = date.format('YYYY');
    const month = date.format('MM');

    const startDate = moment(year + '-' + month + '-' + '01' + ' 00:00:00');
    const endDate = startDate.clone().endOf('month');

    return users.filter((user) => {
      const userCurrentProject = user.projects.find(pr => pr.project === project._id);

      return userCurrentProject ? this.isProjectAtMonth(userCurrentProject, startDate, endDate) : false;
    });
  }


  private isProjectAtMonth(p, startDate, endDate): boolean {
    const dateStart = p.dateStart ? moment(p.dateStart) : moment('1900-01-01');
    const dateEnd = p.dateEnd ? moment(p.dateEnd) : moment('2100-01-01');

    const start = dateStart.isBetween(startDate, endDate) || dateStart.isSameOrBefore(startDate);
    const end = dateEnd.isBetween(startDate, endDate) || dateEnd.isSameOrAfter(endDate);

    return start && end;
  }
}
