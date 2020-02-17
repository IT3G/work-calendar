import { Controller, Get, Param, Post, Body, Put, Delete } from '@nestjs/common';
import { WebPushService } from '../services/web-push.service';
import { PushSubscription } from 'web-push';

@Controller('push')
export class WebPushController {
  constructor(private webPushService: WebPushService) {}

  @Get(':id')
  async pushToUser(@Param('id') id: string) {
    const notification = {
      notification: {
        title: 'Тестовое уведомление',
        body: `Пользователь ${id} отправил тестовое уведомление`,
        icon: `https://calendar.it2g.ru/backend/avatar?login=${id}`,
        vibrate: [100, 50, 100],
        data: {
          dateOfArrival: Date.now().toLocaleString(),
          primaryKey: 1
        }
      }
    };

    return await this.webPushService.sendPushNotification(id, notification);
  }

  @Post(':id')
  async addSubscription(@Param('id') userName: string, @Body() subscription: PushSubscription) {
    return await this.webPushService.addSubscription({ userName, subscription });
  }
}
