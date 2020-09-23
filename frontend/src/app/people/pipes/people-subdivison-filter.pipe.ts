import { Pipe, PipeTransform } from '@angular/core';

import { Employee } from 'src/app/shared/models/employee.model';

@Pipe({
  name: 'peopleSudivisionFilter',
})
export class PeopleSubdivisonFilterPipe implements PipeTransform {
  transform(users: Employee[], filter: string): Employee[] {
    return users.filter((user: Employee) => {
      /** для "все" */
      if (filter === 'all-items') {
        return true;
      }

      /** для "не указано" */
      if (filter === 'Не указано') {
        return user.subdivision ? false : true;
      }

      return user.subdivision?.name === filter;
    });
  }
}
