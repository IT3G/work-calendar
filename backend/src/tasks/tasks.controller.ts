import { Body, Controller, Get, HttpStatus, Param, Post, Res } from '@nestjs/common';
import { TaskResponseModel } from './models/task.request.model';
import { TaskService } from './services/task.service';
import { ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiUseTags('Tasks')
@Controller('tasks')
export class TasksController {
  constructor(private taskService: TaskService) {}

  @Get()
  async getTasks(@Res() res) {
    const tasks = await this.taskService.getTasks();
    return res.status(HttpStatus.OK).json(tasks);
  }

  @Get('/:author')
  async getTasksByAuthor(@Res() res, @Param('author') author) {
    const tasks = await this.taskService.getTasksByAuthor(author);
    return res.status(HttpStatus.OK).json(tasks);
  }

  @Post()
  async addTask(@Res() res, @Body() task: TaskResponseModel) {
    const newTask = await this.taskService.addTask(task);
    return res.status(HttpStatus.OK).json(newTask);
  }
}
