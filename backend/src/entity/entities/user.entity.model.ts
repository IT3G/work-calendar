import { Document } from 'mongoose';
import { JobPositionEntity } from './job-position.entity.model';
import { SubdivisionEntity } from './subdivision.entity.model';
import { AddedProjectEntity } from './added-project.entity.model';

export interface UserEntity extends Document {
  id: string;
  username: string;
  location: string;
  position: string;
  projects: AddedProjectEntity[];
  whenCreated: string;
  email: string;
  telNumber: string;
  physicalDeliveryOfficeName: string;
  mailNickname: string;
  isAdmin: boolean;
  hasMailing: boolean;
  subdivision: SubdivisionEntity;
  jobPosition: JobPositionEntity;
  authType?: string;
  hashPassword?: string;
}
