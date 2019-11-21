import { Schema } from 'mongoose';

export const ProjectSchema = new Schema({
  id: Number,
  title: String,
});
