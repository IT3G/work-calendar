import { Schema } from 'mongoose';

export const UserSchema = new Schema({
  username: String,
  location: String,
  position: String,
  projects: [
    { type: Schema.Types.Mixed, ref: 'AddedProject' },
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
