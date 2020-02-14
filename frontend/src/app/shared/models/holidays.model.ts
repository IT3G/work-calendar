export interface HolidaysModel {
  data: HolidaysYearModel[];
  _id?: string;
}

export interface HolidaysYearModel {
  year: string;
  Jan: string;
  Feb: string;
  Mar: string;
  Apr: string;
  May: string;
  June: string;
  July: string;
  Aug: string;
  Sept: string;
  Oct: string;
  Nov: string;
  Dec: string;
  allDays: string;
  allWork: string;
  hours24: string;
  hours36: string;
  hours40: string;
  fileName: string;
}

export enum HolidaysRawData {
  Jan = 'Январь',
  Feb = 'Февраль',
  Mar = 'Март',
  Apr = 'Апрель',
  May = 'Май',
  June = 'Июнь',
  July = 'Июль',
  Aug = 'Август',
  Sept = 'Сентябрь',
  Oct = 'Октябрь',
  Nov = 'Ноябрь',
  Dec = 'Декабрь',
  allDays = 'Всего праздничных и выходных дней',
  allWork = 'Всего рабочих дней',
  yearMonth = 'Год/Месяц',
  hours24 = 'Количество рабочих часов при 24-часовой рабочей неделе',
  hours36 = 'Количество рабочих часов при 36-часовой рабочей неделе',
  hours40 = 'Количество рабочих часов при 40-часовой рабочей неделе'
}

export enum MonthNumber {
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'June',
  'July',
  'Aug',
  'Sept',
  'Oct',
  'Nov',
  'Dec'
}
