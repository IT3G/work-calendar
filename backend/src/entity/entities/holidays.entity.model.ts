import { Document } from 'mongoose';

export interface HolidaysEntity extends Document {
  year: string;
  data: string;
}
