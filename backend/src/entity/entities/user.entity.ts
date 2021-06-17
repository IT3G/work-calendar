import { Document } from 'mongoose';
import { JobPositionEntity } from './job-position.entity.model';
import { ProjectNewEntity } from './project-new.entity';
import { ProjectOfficeEntity } from './project-office.entity.model';
import { SkillsEntity } from './skills.entity.model';
import { SubdivisionEntity } from './subdivision.entity.model';

export interface UserEntity extends Document {
  username: string;
  patronymic: string;
  location: string;
  position: string;
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
  projectOffice: ProjectOfficeEntity;
  skills: SkillsEntity[];
  projectsNew: ProjectNewEntity[];
  authType: string;
  hashPassword: string;
  terminationDate: string;
  birthday: string;
  remoteWork: boolean;
  lastTimeOnline: string;
  mattermost: string;
  birthdayHideYear: boolean;
}
