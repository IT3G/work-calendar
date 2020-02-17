import { Schema } from 'mongoose';
import { PushSubscription } from 'web-push';

export const WebPushSchema = new Schema({
  userName: String,
  subscription: {
    endpoint: String,
    keys: {
      p256dh: String,
      auth: String
    }
  }
});
