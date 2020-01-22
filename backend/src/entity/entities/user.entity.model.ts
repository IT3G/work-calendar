import { Document, Schema } from 'mongoose';
import { JobPositionEntity } from './job-position.entity.model';
import { SubdivisionEntity } from './subdivision.entity.model';
import { ProjectEntity } from './project.entity.model';

export interface UserEntity extends Document {
  id: string;
  username: string;
  location: string;
  position: string;
  projects: [
    {
      dateStart: string;
      dateEnd: string;
      project: ProjectEntity;
    }
  ];
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
