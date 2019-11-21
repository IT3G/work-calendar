import { Schema } from 'mongoose';

export const TaskSchema = new Schema({
  comment: String,
  dateEnd: String,
  dateStart: String,
  dtCreated: String,
  employee: String,
  type: String,
  employeeCreated: String,
});
