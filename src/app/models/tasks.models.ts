import { Moment } from 'moment';

export class TasksModel {
  $key?: string;
  id: number;
  dateStart: Moment;
  dateEnd: Moment;
}
