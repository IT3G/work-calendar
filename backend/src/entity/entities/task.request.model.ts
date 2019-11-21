import { Document } from 'mongoose';

export interface TaskEntity extends Document {
  comment: string;
  dateEnd: string;
  dateStart: string;
  dtCreated: string;
  employee: string;
  type: string;
  employeeCreated: string;
}
