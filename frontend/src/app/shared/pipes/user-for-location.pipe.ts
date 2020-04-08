import { Pipe, PipeTransform } from '@angular/core';
import { Employee } from '../models/employee.model';
import { LocationEnum } from '../models/location.enum';

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
