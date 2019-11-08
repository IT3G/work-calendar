import { DayType } from './day-type.const';

export const AgendaColors = [
  {
    id: DayType.COMMON,
    title: 'Стандартно',
    color: '#FFFFFF'
  },
  {
    id: DayType.CUSTOM,
    title: 'Особое',
    color: '#90CAF9'
  },
  {
    id: DayType.LEFT,
    title: 'Отсутствие',
    color: '#EF9A9A'
  },
  {
    id: DayType.VACATION,
    title: 'Отпуск',
    color: '#C5E1A5'
  },
  {
    id: DayType.SICK,
    title: 'Болезнь',
    color: '#FFE082'
  }
];
