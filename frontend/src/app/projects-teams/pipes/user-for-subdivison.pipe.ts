import { Pipe, PipeTransform } from '@angular/core';

import { Employee } from '../../shared/models/employee.model';

@Pipe({
  name: 'userForSubdivision',
})
export class UserForSubdivisionPipe implements PipeTransform {
  transform(users: Employee[], subdivision: string): Employee[] {
    if (!users) {
      return [];
    }

    return users.filter((user) => {
      if (subdivision === 'Не указано / Другое') {
        return !user.subdivision;
      }
      return user.subdivision?.name === subdivision;
    });
  }
}
