import { DictionaryModel } from './dictionary.model';
import { ProjectNew } from './project-new';

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
  projects: [
    {
      _id: string;
      project: string;
      dateStart: string;
      dateEnd: string;
    }
  ];
  isAdmin: boolean;
  hasMailing: boolean;
  subdivision: DictionaryModel;
  jobPosition: DictionaryModel;
  hashPassword: string;
  projectsNew: ProjectNew[];
}
