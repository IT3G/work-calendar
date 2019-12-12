import { Schema } from 'mongoose';

export const HolidaysSchema = new Schema({
  year: String,
  data: String,
});
