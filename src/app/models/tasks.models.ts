import { Moment } from 'moment';
import { DayType } from '../shared/const/day-type.const';

export class TaskModel {
  id: number;
  type: DayType;
  date: Moment;
}
