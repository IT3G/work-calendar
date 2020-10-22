import { Schema } from 'mongoose';

export const SkillsSchema = new Schema({
  name: String,
  hint: String,
  logoName: String,
});
