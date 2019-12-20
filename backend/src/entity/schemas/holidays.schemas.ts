import { Schema } from 'mongoose';

const HolidaysYearSchema = new Schema({
      year: String,
      Jan: String,
      Feb: String,
      Mar: String,
      Apr: String,
      May: String,
      June: String,
      July: String,
      Aug: String,
      Sept: String,
      Oct: String,
      Nov: String,
      Dec: String,
      allDays: String,
      allWork: String,
      hours24: String,
      hours36: String,
      hours40: String,
      fileName: String,
  })
;

export const HolidaysSchema = new Schema({
    data: [ HolidaysYearSchema],
});
