import { Schema } from 'mongoose';

export const FollowSchema = new Schema({
  followerId: { type: Schema.Types.ObjectId, ref: 'Users' },
  followingId: { type: Schema.Types.ObjectId, ref: 'Users' },
  followType: String
});
