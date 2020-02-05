import { Pipe, PipeTransform } from '@angular/core';
import { Employee } from '../../shared/models/employee.model';
import { LocationEnum } from '../../shared/models/location.enum';

@Pipe({
  name: 'userForLocation'
})
export class UserForLocationPipe implements PipeTransform {

  transform(users: Employee[], location: LocationEnum): Employee[] {
    if (!users) {
      return [];
    }
    return users.filter(user => user.location === location);
  }
}
