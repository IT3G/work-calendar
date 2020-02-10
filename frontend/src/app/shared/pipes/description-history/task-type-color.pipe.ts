import { Pipe, PipeTransform } from '@angular/core';
import { AgendaColors } from '../../const/agenda-colors.const';
import { AgendaColorsModel } from '../../models/agenda-colors.model';
import { DayType } from '../../const/day-type.const';

@Pipe({
  name: 'taskTypeColor'
})
export class TaskTypeColorPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) {
      return '';
    }
    const result = AgendaColors.find((agenda: AgendaColorsModel) => agenda.id === value);

    return result ? result.color : '';
  }
}
