import { ToggleButtonDataModel } from '../components/radio-button-group/radio-button-group.model';

export const subdivisionColors = [
  {
    title: 'Аналитика',
    subdivision_id: '5e454e0ecd5ae500129ed283',
    color: '#ffb9c7',
  },
  {
    title: 'Проектный офис',
    subdivision_id: '5e3d7163a1d401001269988f',
    color: '#ffdc7e',
  },
  {
    title: 'Разработка',
    subdivision_id: '5de66bd9d96c72001240557b',
    color: '#8bffa5',
  },
  {
    title: 'СТП',
    subdivision_id: '5f644d11b12e720013569ad5',
    color: '#CCCCFF',
  },
];

export const radioButtonGroupCommonColor: ToggleButtonDataModel[] = [
  {
    title: 'Все',
    color: '#EFECEC',
    value: 'all-items',
  },
  {
    title: 'Не указано',
    color: '#8befed',
    value: 'undefined-value',
  },
];

// если в фильтре и карточках появился этот цвет,
// значит подразделений прибавилось,
// и в SubdivisionColors надо добавить информацию
export const notFindColor = '#ff4ac7';
