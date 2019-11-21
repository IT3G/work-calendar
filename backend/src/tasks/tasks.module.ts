import { Module } from '@nestjs/common';
import { TaskService } from './services/task.service';
import { TasksController } from './tasks.controller';

@Module({
  controllers: [TasksController],
  providers: [TaskService],
})
export class TasksModule {}
