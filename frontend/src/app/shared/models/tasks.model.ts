import { DayType } from '../const/day-type.const';

export class TaskModel {
  _id: string;
  type: DayType;
  dateStart: string;
  dateEnd: string;
  employee: string;
  comment: string;
  dtCreated: string;
  approved: boolean;
  attachment: {
    fileName: string;
    originalName: string;
  };
  employeeCreated: string;
}
