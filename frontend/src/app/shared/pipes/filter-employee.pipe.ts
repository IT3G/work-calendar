import { Pipe, PipeTransform } from '@angular/core';
import { Employee } from '../models/employee.model';
import * as moment from 'moment';
import { NewProjectUtils } from '../utils/new-project.utils';
@Pipe({
  name: 'filterEmployeePipe'
})
export class FilterEmployeePipe implements PipeTransform {
  constructor() {}

  transform(value: Employee[], filter: string): Employee[] {
    if (!filter) {
      return value;
    }

    const currentDate = moment();

    return value.filter((v) => {
      if (!v.projectsNew || !v.projectsNew.length) {
        return false;
      }

      return v.projectsNew
        .filter((p) => p.metadata.some((m) => currentDate.isSame(NewProjectUtils.mapMetadataToDate(m), 'month')))
        .some((proj) => proj.project_id === filter);
    });
  }
}
