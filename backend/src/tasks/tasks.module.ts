import { Module } from '@nestjs/common';
import { EntityModule } from '../entity/entity.module';
import { TaskService } from './services/task.service';
import { TasksController } from './tasks.controller';
import { MailModule } from '../mail/mail.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [EntityModule, MailModule, UsersModule],
  controllers: [TasksController],
  providers: [TaskService],
})
export class TasksModule {}
