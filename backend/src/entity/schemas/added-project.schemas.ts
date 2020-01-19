import { Schema } from 'mongoose';

export const AddedProjectSchema = new Schema({
  dateStart: String,
  dateEnd: String,
  project: { type: Schema.Types.ObjectId, ref: 'Project' },
});
