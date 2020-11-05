import { Schema } from 'mongoose';

export const UserSchema = new Schema({
  username: String,
  patronymic: String,
  location: String,
  position: String,
  projects: [
    {
      dateStart: String,
      dateEnd: String,
      project: { type: Schema.Types.ObjectId, ref: 'Project' },
    },
  ],
  projectsNew: [
    {
      project_id: { type: Schema.Types.ObjectId, ref: 'Project' },
      project_name: String,
      metadata: [
        {
          month: Number,
          year: Number,
          percent: Number,
        },
      ],
    },
  ],
  whenCreated: String,
  email: String,
  telNumber: String,
  telegram: String,
  skype: String,
  physicalDeliveryOfficeName: String,
  mailNickname: String,
  isAdmin: Boolean,
  hasMailing: Boolean,
  subdivision: { type: Schema.Types.ObjectId, ref: 'Subdivision' },
  jobPosition: { type: Schema.Types.ObjectId, ref: 'JobPosition' },
  skills: [{ type: Schema.Types.ObjectId, ref: 'Skills' }],
  authType: String,
  hashPassword: String,
  terminationDate: String,
  birthday: String,
  remoteWork: Boolean,
  lastTimeOnline: String,
});
