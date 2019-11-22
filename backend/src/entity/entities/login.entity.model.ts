import { Document } from 'mongoose';
import { JobPositionEntity } from './job-position.entity.model';

export interface UserEntity extends Document {
  username: string;
  location: string;
  position: string;
  projects: string[];
  whenCreated: string;
  email: string;
  telNumber: string;
  physicalDeliveryOfficeName: string;
  mailNickname: string;
  isAdmin: boolean;
  hasMailing: boolean;
  subdivision: string;
  jobPosition: JobPositionEntity;
  authType?: string;
  hashPswd?: string;
}
