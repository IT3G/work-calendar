import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';
import { Moment } from 'moment';
import { PresenceModel } from '../../shared/models/presence.page.model';
import { PresenceFiltersFormModel } from '../models/presence-filters-form.model';
import { ProjectNew } from '../../shared/models/project-new';
@Pipe({
  name: 'presenceFilter'
})
export class PresenceFilterPipe implements PipeTransform {
  transform(value: PresenceModel[], filter: PresenceFiltersFormModel, date: Moment): PresenceModel[] {
    if (!value) {
      return [];
    }

    if (!filter) {
      return value;
    }

    let res: PresenceModel[] = [...value];

    if (filter.name) {
      res = res.filter(
        i => i.employee.username && i.employee.username.toLowerCase().includes(filter.name.toLowerCase())
      );
    }

    if (filter.location) {
      res = res.filter(
        i => i.employee.location && i.employee.location.toLowerCase() === filter.location.toLocaleLowerCase()
      );
    }

    if (filter.jobPosition) {
      res = res.filter(i => i.employee.jobPosition && i.employee.jobPosition.name === filter.jobPosition);
    }

    if (filter.subdivision) {
      res = res.filter(i => i.employee.subdivision && i.employee.subdivision.name === filter.subdivision);
    }

    if (filter.project) {
      res = res.filter(
        p =>
          p.employee &&
          p.employee.projectsNew &&
          p.employee.projectsNew.some(p => p.project_id === filter.project && this.isProjectAtMonth(p, date))
      );
    }

    return res;
  }

  private isProjectAtMonth(p: ProjectNew, date: Moment): boolean {
    return p.metadata.some(m => moment(`${m.month}-${m.year}`, 'M-YYYY').isSame(date, 'month'));
  }
}
