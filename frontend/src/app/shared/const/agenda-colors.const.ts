import { DayType } from './day-type.const';

export const AgendaColors = [
  {
    id: DayType.COMMON,
    title: 'Стандартно',
    color: '#FFFFFF',
    tooltip: 'Стандартное присутствие на рабочем месте, заполнено по умолчанию согласно графику'
  },
  {
    id: DayType.CUSTOM,
    title: 'Особое',
    color: '#90CAF9',
    tooltip:
      'Измененное присутствие (работа из дома, пришел попозже / ушёл попозже, сегодня не доработаю потом отработаю, и т.д.)'
  },
  {
    id: DayType.LEFT,
    title: 'Отсутствие',
    color: '#EF9A9A',
    tooltip: 'Заранее согласовано с руководителем (например из-за переработок), либо форс-мажор'
  },
  {
    id: DayType.VACATION,
    title: 'Отпуск',
    color: '#C5E1A5',
    tooltip: 'Запланировать заранее'
  },
  {
    id: DayType.SICK,
    title: 'Болезнь',
    color: '#FFE082',
    tooltip: 'Заболел, отсутствую на работе'
  }
];

