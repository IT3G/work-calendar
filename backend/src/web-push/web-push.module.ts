import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { WebPushSchema } from './schemas/web-push.schema';
import { WebPushService } from './services/web-push.service';
import { WebPushController } from './controllers/web-push.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'WebPush', schema: WebPushSchema }])],
  providers: [WebPushService],
  controllers: [WebPushController],
  exports: [WebPushService]
})
export class WebPushModule {}
