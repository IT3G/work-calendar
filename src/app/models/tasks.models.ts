import { Moment } from 'moment';

export class TasksModel {
  $key?: string;
  id: string;
  dateStart: Moment;
  dateEnd: Moment;
}
