import { Schema } from 'mongoose';

export const UserSchema = new Schema({
  username: String,
  location: String,
  position: String,
  projects: Array,
  whenCreated: String,
  email: String,
  telNumber: String,
  physicalDeliveryOfficeName: String,
  mailNickname: String,
  isAdmin: Boolean,
  hasMailing: Boolean,
  subdivision: String,
  jobPosition: { type: Schema.Types.ObjectId, ref: 'JobPosition' },
});
