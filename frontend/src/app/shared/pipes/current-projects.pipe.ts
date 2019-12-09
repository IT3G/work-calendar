import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';
import { Employee } from '../models/employee.model';

@Pipe({
  name: 'currentProjectsPipe'
})
export class CurrentProjectsPipe implements PipeTransform {
  transform(emp: Employee): string {
    const result = emp.projects
      .map(p => {
        p.dateStart = p.dateStart ? p.dateStart : moment('1900-01-01').format();
        p.dateEnd = p.dateEnd ? p.dateEnd : moment('2100-01-01').format();
        return p;
      })
      .filter(p => moment().isBetween(p.dateStart, p.dateEnd))
      .filter(p => p!)
      .map(p => p.project);

    if (!result.length) {
      return '-';
    }

    return result.join(', ');
  }
}
