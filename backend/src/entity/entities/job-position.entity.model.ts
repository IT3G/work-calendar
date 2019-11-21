import { Document } from 'mongoose';

export interface JobPositionEntity extends Document {
  name: string;
}
