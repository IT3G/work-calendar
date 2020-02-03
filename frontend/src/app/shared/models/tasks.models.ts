import { DayType } from '../const/day-type.const';
import { Moment } from 'moment';

export class TaskModel {
  type: DayType;
  dateStart: Moment;
  dateEnd: Moment;
  employee: string;
  comment: string;
  dtCreated: Moment;
  employeeCreated: string;
}
