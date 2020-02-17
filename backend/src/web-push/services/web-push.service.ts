import { Injectable } from '@nestjs/common';
import { WebPushEntity } from '../entities/web-push.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { sendNotification, setVapidDetails } from 'web-push';

import { SubscriptionModel } from '../models/subscription.model';
import { NotificationPayloadModel } from '../models/notification-payload.model';
import { Config } from '../../config/config';

@Injectable()
export class WebPushService {
  constructor(@InjectModel('WebPush') private readonly webPushModel: Model<WebPushEntity>, private config: Config) {
    this.initWebPush();
  }

  private initWebPush() {
    setVapidDetails(`mailto:${this.config.PUSH_MAIL_TO}`, this.config.PUSH_PUBLIC_KEY, this.config.PUSH_PRIVATE_KEY);
  }

  async addSubscription(webPush: SubscriptionModel): Promise<WebPushEntity> {
    const subscription = await this.webPushModel.findOne({ userName: webPush.userName });

    if (subscription) {
      return await this.webPushModel.findByIdAndUpdate(subscription._id, webPush);
    }

    return await this.webPushModel.create(webPush);
  }

  async sendPushNotification(userName: string, payload: NotificationPayloadModel): Promise<void> {
    try {
      const subscriptionData = await this.webPushModel.findOne({ userName });

      if (!subscriptionData || !subscriptionData.subscription) {
        return;
      }

      await sendNotification(subscriptionData.subscription, JSON.stringify(payload));
    } catch (e) {
      console.log('Ошибка при отправке пуша', e);
    }
  }
}