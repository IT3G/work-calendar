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
      title: string;
      dateStart: string;
      dateEnd: string;
    }
  ];
  isAdmin: boolean;
  hasMailing: boolean;
  subdivision: string;
  jobPosition: string;
}
