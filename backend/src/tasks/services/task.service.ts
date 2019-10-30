import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TaskResponseModel } from '../models/task.request.model';

@Injectable()
export class TaskService {
  constructor(
    @InjectModel('Tasks') private readonly taskModel: Model<TaskResponseModel>,
  ) {}

  async getTasks(): Promise<TaskResponseModel[]> {
    const users = await this.taskModel.find().exec();
    return users;
  }

  async addTask(task: TaskResponseModel): Promise<TaskResponseModel> {
    const newTask = await this.taskModel(task);
    return newTask.save();
  }
}
