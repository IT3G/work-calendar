import * as mongoose from 'mongoose';

export const ProjectSchema = new mongoose.Schema({
  id: Number,
  title: String
});
