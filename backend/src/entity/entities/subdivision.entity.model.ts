import { Document } from 'mongoose';

export interface SubdivisionEntity extends Document {
  id: number;
  title: string;
}
