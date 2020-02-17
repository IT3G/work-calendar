import { Module } from '@nestjs/common';
import { EntityModule } from '../entity/entity.module';
import { TaskService } from './services/task.service';
import { TasksController } from './tasks.controller';
import { MailModule } from '../mail/mail.module';
import { UsersModule } from '../users/users.module';
import { WebPushModule } from '../web-push/web-push.module';

@Module({
  imports: [EntityModule, MailModule, UsersModule, WebPushModule],
  controllers: [TasksController],
  providers: [TaskService],
})
export class TasksModule {
}
