import { DictionaryModel } from './dictionary.model';

export class Employee {
  _id: string;
  username: string;
  location: string;
  position: string;
  whenCreated: string;
  email: string;
  telNumber: string;
  physicalDeliveryOfficeName: string;
  mailNickname: string;
  projects: [
    {
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
}
