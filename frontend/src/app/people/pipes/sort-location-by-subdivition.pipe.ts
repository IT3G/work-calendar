import { Pipe, PipeTransform } from '@angular/core';

import { Employee } from 'src/app/shared/models/employee.model';
import { LocationUserModel } from '../models/location-user.model';

@Pipe({
  name: 'sortLocationBySubdivision',
})
export class SortLocationBySubdivisionPipe implements PipeTransform {
  transform(location: Set<string>, locationUser: LocationUserModel[], currentSubdivision: string): Set<string> {
    const locationArray = new Set(
      Array.from(location).sort((a, b) => {
        return (
          this.filterPeoplesBySubdivion(locationUser[b], currentSubdivision).length -
          this.filterPeoplesBySubdivion(locationUser[a], currentSubdivision).length
        );
      })
    );

    return locationArray;
  }

  private filterPeoplesBySubdivion(users: Employee[], filter: string) {
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
