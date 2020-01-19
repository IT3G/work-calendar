import { Document } from 'mongoose';

export interface AddedProjectEntity extends Document  {
  dateStart: string;
  dateEnd: string;
  project: string;
}
