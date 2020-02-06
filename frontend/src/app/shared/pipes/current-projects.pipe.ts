import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';
import { Employee } from '../models/employee.model';
import { DictionaryModel } from '../models/dictionary.model';
import { NewProjectUtils } from '../utils/new-project.utils';

@Pipe({
  name: 'currentProjectsPipe'
})
export class CurrentProjectsPipe implements PipeTransform {
  transform(emp: Employee): string {
    if (!emp) {
      return '-';
    }

    const currentDate = moment();

    const result = emp.projectsNew
      .filter(p => p.metadata.some(m => currentDate.isSame(NewProjectUtils.mapMetadataToDate(m), 'month')))
      .map(p => p.project_name);

    if (!result.length) {
      return '-';
    }

    return result.join(', ');
  }
}
