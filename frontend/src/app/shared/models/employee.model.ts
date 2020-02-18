import { DictionaryModel } from './dictionary.model';
import { ProjectNew } from './project-new';
import { EmployeeProject } from './employee-project.model';

export class Employee {
  _id: string;
  username: string;
  location: string;
  position: string;
  whenCreated: string;
  email: string;
  telNumber: string;
  telegram: string;
  skype: string;
  physicalDeliveryOfficeName: string;
  mailNickname: string;
  projects: EmployeeProject[];
  isAdmin: boolean;
  hasMailing: boolean;
  subdivision: DictionaryModel;
  jobPosition: DictionaryModel;
  hashPassword: string;
  projectsNew: ProjectNew[];
}
