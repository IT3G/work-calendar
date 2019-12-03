import { Document } from 'mongoose';

export interface SubdivisionEntity extends Document {
  name: string;
}
