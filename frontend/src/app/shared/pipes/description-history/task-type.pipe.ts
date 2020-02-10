import { Pipe, PipeTransform } from '@angular/core';
import { AgendaColors } from '../../const/agenda-colors.const';
import { AgendaColorsModel } from '../../models/agenda-colors.model';
import { DayType } from '../../const/day-type.const';

@Pipe({
  name: 'taskType'
})
export class TaskTypePipe implements PipeTransform {
  transform(value: number): any {
    if (!value) {
      return null;
    }

    const agendaColor = AgendaColors.find(
      (agenda: AgendaColorsModel) => agenda.id === value
    );

    return agendaColor ? agendaColor.title : null;
  }
}
