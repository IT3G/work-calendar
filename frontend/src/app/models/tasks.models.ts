import { Moment } from 'moment';
import { DayType } from '../const/day-type.const';

export class TaskModel {
  type: DayType;
  dateStart: Moment;
  dateEnd: Moment;
  employee: string;
  comment: string;
  dtCreated: Moment;
  employeeCreated: string;
}
