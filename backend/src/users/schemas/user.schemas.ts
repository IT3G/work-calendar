import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  username: String,
  location: String,
  position: String,
  projects: String,
  whenCreated: String,
  email: String,
  telNumber: String,
  physicalDeliveryOfficeName: String,
  mailNickname: String,
  isAdmin: Boolean,
  hasMailing: Boolean,
});
