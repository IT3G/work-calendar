import { Moment } from 'moment';
import { Employee } from './employee.model';
import { DayType } from '../const/day-type.const';

export class TaskModel {
  id: number;
  type: DayType;
  date: Moment;
  employeeId: number;
  comment: string;
  dtCreated: Moment;
  userCreated: Employee;
}
