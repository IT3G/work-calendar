import { Document } from 'mongoose';

export interface ProjectEntity extends Document {
  name: string;
}
