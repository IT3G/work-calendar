import { Pipe, PipeTransform } from '@angular/core';
import { AgendaOptions } from '../../const/agenda-options.const';
import { AgendaOptionsModel } from '../../models/agenda-options.model';

@Pipe({
  name: 'taskType'
})
export class TaskTypePipe implements PipeTransform {
  transform(value: string): string {
    if (!value) {
      return null;
    }

    const agendaOption = AgendaOptions.find((agenda: AgendaOptionsModel) => agenda.id === value);

    return agendaOption ? agendaOption.title : null;
  }
}
