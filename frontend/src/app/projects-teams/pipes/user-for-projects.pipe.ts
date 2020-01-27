import { Pipe, PipeTransform } from '@angular/core';
import { Employee } from '../../shared/models/employee.model';
import { DictionaryModel } from '../../shared/models/dictionary.model';

@Pipe({
  name: 'userForProjects'
})
export class UserForProjectsPipe implements PipeTransform {

  transform(users: Employee[], project: DictionaryModel): Employee[] {
    if (!users) {
      return [];
    }
    return users.filter(user => user.projects.some(prj => prj.project === project._id));
  }
}
