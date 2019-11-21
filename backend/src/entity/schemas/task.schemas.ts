import * as mongoose from 'mongoose';

export const TaskSchema = new mongoose.Schema({
  comment: String,
  dateEnd: String,
  dateStart: String,
  dtCreated: String,
  employee: String,
  type: String,
  employeeCreated: String,
});
