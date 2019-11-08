import { Pipe, PipeTransform } from '@angular/core';
import { Employee } from '../models/employee.model';
@Pipe({
  name: 'filterEmployeePipe'
})
export class FilterEmployeePipe implements PipeTransform {
  transform(value: Employee[], filter: string): Employee[] {
    if (!filter) {
      return value;
    }

    return value.filter(v => v.projects.includes(filter));
  }
}
