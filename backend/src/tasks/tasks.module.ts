import { Module } from '@nestjs/common';
import { EntityModule } from '../entity/entity.module';
import { TaskService } from './services/task.service';
import { TasksController } from './tasks.controller';
import { MailModule } from '../mail/mail.module';
import { UsersModule } from '../users/users.module';
import { TaskDeleteGuard } from './guards/task-delete.guard';

@Module({
  imports: [EntityModule, MailModule, UsersModule],
  controllers: [TasksController],
  providers: [TaskService, TaskDeleteGuard]
})
export class TasksModule {}
