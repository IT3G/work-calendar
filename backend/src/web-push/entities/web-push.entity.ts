import { Document } from 'mongoose';
import { PushSubscription } from 'web-push';

export interface WebPushEntity extends Document {
  userName: string;
  subscription: PushSubscription;
}
