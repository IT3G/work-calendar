import { Injectable } from '@nestjs/common';
import { WebPushEntity } from '../entities/web-push.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { sendNotification, setVapidDetails } from 'web-push';

import { SubscriptionModel } from '../models/subscription.model';
import { NotificationPayloadModel } from '../models/notification-payload.model';

@Injectable()
export class WebPushService {
  constructor(@InjectModel('WebPush') private readonly webPushModel: Model<WebPushEntity>) {
    setVapidDetails(
      'mailto:kliment1986@inbox.org',
      'BMI7mNzEiCPhWNTpwbkxb4BRwKuVvkhlrmqPnxnvF5SGg2cujk-nL4s0x4j8jjZD529nwR1QQw1_ayRPUrvYPdk',
      'crgOgkQDjKCH_3JgDiFi3TL77nhV_noPE4Ty7sONkWA'
    );
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
