import { DayType } from './day-type.const';
import { AgendaOptionsModel } from '../models/agenda-options.model';

export const AgendaOptions: AgendaOptionsModel[] = [
  {
    id: DayType.COMMON,
    title: 'Стандартно',
    tooltip: 'Стандартное присутствие на рабочем месте, заполнено по умолчанию согласно графику'
  },
  {
    id: DayType.CUSTOM,
    title: 'Особое',
    tooltip:
      'Измененное присутствие (работа из дома, пришел попозже / ушёл попозже, сегодня не доработаю потом отработаю, и т.д.)'
  },
  {
    id: DayType.LEFT,
    title: 'Отсутствие',
    tooltip: 'Заранее согласовано с руководителем (например из-за переработок), либо форс-мажор'
  },
  {
    id: DayType.VACATION,
    title: 'Отпуск',
    tooltip: 'Запланировать заранее'
  },
  {
    id: DayType.SICK,
    title: 'Болезнь',
    tooltip: 'Заболел, отсутствую на работе'
  }
];
