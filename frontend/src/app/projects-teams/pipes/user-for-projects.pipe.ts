import { Pipe, PipeTransform } from '@angular/core';
import { Employee } from '../../shared/models/employee.model';

@Pipe({
  name: 'userForProjects'
})
export class UserForProjectsPipe implements PipeTransform {

  transform(users: Employee[], project: string): string[] {
    if (!users) {
      return [];
    }
    return users.filter(user => user.projects.some(prj => prj.project === project)).map(i => i.username);
  }
}
