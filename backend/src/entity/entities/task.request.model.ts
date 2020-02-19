import { Document } from 'mongoose';

export interface TaskEntity extends Document {
  comment: string;
  dateEnd: string;
  dateStart: string;
  dtCreated: string;
  /** логин сотрудника, которому принадлежит задача */
  employee: string;
  type: string;
  approved: boolean;
  /** логин сотрудника, создавшего задачу */
  employeeCreated: string;
}
