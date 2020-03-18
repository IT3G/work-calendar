import { Schema } from 'mongoose';

export const RefreshTokenSchema = new Schema({
  token: String,
  date: String,
  userId: { type: Schema.Types.ObjectId, ref: 'User' }
});
