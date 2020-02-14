import { Document } from 'mongoose';
import { JobPositionEntity } from './job-position.entity.model';
import { SubdivisionEntity } from './subdivision.entity.model';
import { ProjectEntity } from './project.entity.model';
import { ProjectNewEntity } from './project-new.entity';

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
  projectsNew: ProjectNewEntity[];
  whenCreated: string;
  email: string;
  telNumber: string;
  skype: string;
  telegram: string;
  physicalDeliveryOfficeName: string;
  mailNickname: string;
  isAdmin: boolean;
  hasMailing: boolean;
  subdivision: SubdivisionEntity;
  jobPosition: JobPositionEntity;
  authType?: string;
  hashPassword?: string;
}
