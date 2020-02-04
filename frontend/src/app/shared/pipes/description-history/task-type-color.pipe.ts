import { Pipe, PipeTransform } from '@angular/core';
import { AgendaColors } from '../../const/agenda-colors.const';
import { AgendaColorsModel } from '../../models/agenda-colors.model';
import { DayType } from '../../const/day-type.const';

@Pipe({
  name: 'taskTypeColor'
})
export class TaskTypeColorPipe implements PipeTransform {
  transform(value: number): string {
    if (!value) {
      return '';
    }
    const result = AgendaColors.find((agenda: AgendaColorsModel) => {
      return agenda.id.toString() === DayType[value].toString();
    }).color;

    if (!result) {
      return '';
    }

    return result;
  }
}
