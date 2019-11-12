import { Pipe, PipeTransform } from '@angular/core';
import { PresenceModel } from '../models/presence.page.model';
@Pipe({
  name: 'filterTeamEmployeePipe'
})
export class FilterTeamEmployeePipe implements PipeTransform {
  transform(value: PresenceModel[], filter: string): PresenceModel[] {
    if (!filter) {
      return value;
    }

    return value.filter(v => v.employee.projects.includes(filter));
  }
}
