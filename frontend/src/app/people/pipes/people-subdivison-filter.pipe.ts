import { Pipe, PipeTransform } from '@angular/core';

import { Employee } from 'src/app/shared/models/employee.model';

@Pipe({
  name: 'peopleSudivisionFilter',
})
export class PeopleSubdivisonFilterPipe implements PipeTransform {
  transform(users: Employee[], filter: string): Employee[] {
    console.log(users);
    return users.filter((user: Employee) => {
      /** для тех кто уже уволился */
      if (user.terminationDate ? new Date(user.terminationDate) < new Date() : false) {
        console.log(new Date(user.terminationDate), new Date());
        return false;
      }
      /** для "все" */
      if (filter === 'all-items') {
        return true;
      }

      /** для "не указано" */
      if (filter === 'undefined-value') {
        return user.subdivision ? false : true;
      }

      return user.subdivision?.name === filter;
    });
  }
}
