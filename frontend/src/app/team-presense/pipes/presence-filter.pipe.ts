import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';
import { Moment } from 'moment';
import { PresenceModel } from '../../shared/models/presence.page.model';
import { NewProjectUtils } from '../../shared/utils/new-project.utils';
import { PresenceFiltersFormModel } from '../models/presence-filters-form.model';
@Pipe({
  name: 'presenceFilter',
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
        (i) => i.employee.username && i.employee.username.toLowerCase().includes(filter.name.toLowerCase())
      );
    }

    if (filter.location) {
      res = res.filter(
        (i) => i.employee.location && i.employee.location.toLowerCase() === filter.location.toLocaleLowerCase()
      );
    }

    if (filter.jobPosition) {
      res = res.filter((i) => i.employee.jobPosition && i.employee.jobPosition.name === filter.jobPosition);
    }

    if (filter.subdivision) {
      res = res.filter((i) => i.employee.subdivision && i.employee.subdivision.name === filter.subdivision);
    }

    if (filter.projectOffice) {
      res = res.filter((i) => i.employee.projectOffice && i.employee.projectOffice.name === filter.projectOffice);
    }

    if (filter.project) {
      res = res.filter(
        (p) => p.employee && NewProjectUtils.isUserHaveSameOrLastProjectInCurrentMonth(p.employee, date, filter.project)
      );
    }
    return res.filter((p) => date.isSameOrAfter(moment(p.employee.whenCreated), 'month'));
  }
}
