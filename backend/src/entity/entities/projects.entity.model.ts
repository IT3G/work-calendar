import { Document } from 'mongoose';

export interface ProjectEntity extends Document {
  id: number;
  name: string;
}
