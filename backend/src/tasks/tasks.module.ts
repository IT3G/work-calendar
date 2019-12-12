import { Module } from '@nestjs/common';
import { EntityModule } from '../entity/entity.module';
import { TaskService } from './services/task.service';
import { TasksController } from './tasks.controller';

@Module({
  imports: [EntityModule],
  controllers: [TasksController],
  providers: [TaskService],
})
export class TasksModule {
}
