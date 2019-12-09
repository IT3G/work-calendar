import { Schema } from 'mongoose';

export const ProjectSchema = new Schema({
  id: Number,
  name: String,
});
