import { Schema } from 'mongoose';

export const SettingsSchema = new Schema({
  logoName: String,
  title: String
});
