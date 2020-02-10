import { DayType } from '../const/day-type.const';

export class TaskModel {
  type: DayType;
  dateStart: string;
  dateEnd: string;
  employee: string;
  comment: string;
  dtCreated: string;
  employeeCreated: string;
}
