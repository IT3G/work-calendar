import { Schema } from 'mongoose';

export const UserSchema = new Schema({
  username: String,
  location: String,
  position: String,
  projects: [
    {
      dateStart: String,
      dateEnd: String,
      project: { type: Schema.Types.ObjectId, ref: 'Project' },
    },
  ],
  whenCreated: String,
  email: String,
  telNumber: String,
  physicalDeliveryOfficeName: String,
  mailNickname: String,
  isAdmin: Boolean,
  hasMailing: Boolean,
  subdivision: { type: Schema.Types.ObjectId, ref: 'Subdivision' },
  jobPosition: { type: Schema.Types.ObjectId, ref: 'JobPosition' },
  authType: String,
  hashPassword: String,
});
