import { DictionaryModel } from './dictionary.model';
import { LastProjectModel } from './last-project.model';
import { ProjectNewModel } from './project-new.model';
import { SkillsModel } from './skills.model';

export class Employee {
  _id: string;
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
  subdivision: DictionaryModel;
  jobPosition: DictionaryModel;
  projectOffice: DictionaryModel;
  projectsNew: ProjectNewModel[];
  terminationDate: string;
  lastProjects: LastProjectModel[];
  skills: SkillsModel[];
  birthday: string;
  remoteWork: boolean;
  lastTimeOnline: string;
  mattermost: string;
  birthdayHideYear: boolean;
}
