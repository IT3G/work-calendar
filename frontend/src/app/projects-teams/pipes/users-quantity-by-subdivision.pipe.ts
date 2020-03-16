import { Pipe, PipeTransform } from '@angular/core';
import { Employee } from 'src/app/shared/models/employee.model';
import { ProjectDataModel } from '../models/project-data.model';

@Pipe({
  name: 'usersQuantityBySubdivision'
})
export class UsersQuantityBySubdivisionPipe implements PipeTransform {
  transform(users: Employee[], subdivisionName: string): string {
    if (!users?.length) {
      return '';
    }

    const usersQuantity = users.filter(u => u?.subdivision?.name === subdivisionName).length;

    if (!usersQuantity) {
      return '';
    }

    return `${subdivisionName}: ${usersQuantity}`;
  }
}
