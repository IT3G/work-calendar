import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';
import { Moment } from 'moment';
import { PresenceModel } from '../models/presence.page.model';

@Pipe({
  name: 'filterTeamEmployeePipe'
})
export class FilterTeamEmployeePipe implements PipeTransform {
  transform(value: PresenceModel[], filter: string, date: Moment): PresenceModel[] {
    if (!filter) {
      return value;
    }

    return value
      .filter(v => v.employee.projects.some(proj => proj.title === filter))
      .filter(v => {
        const infoAboutProj = v.employee.projects.find(proj => proj.title === filter);

        const dateStart = date.clone().startOf('month');
        const dateEnd = date.clone().endOf('month');
        let res = [];

        while (dateStart.isBefore(dateEnd)) {
          res.push(dateStart.clone());
          dateStart.add(1, 'd');
        }

        return res.some(date => moment(date).isBetween(infoAboutProj.dateStart, infoAboutProj.dateEnd));
      });
  }
}
