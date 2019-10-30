import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TaskSchema } from './schemas/task.schemas';
import { TaskService } from './services/task.service';
import { TasksController } from './tasks.controller';

@Module({
  controllers: [TasksController],
  providers: [TaskService],
  imports: [MongooseModule.forFeature([{ name: 'Tasks', schema: TaskSchema }])],
})
export class TasksModule {}
