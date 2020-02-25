import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiUseTags } from '@nestjs/swagger';
import { Response } from 'express';
import { TaskDeleteGuard } from '../guards/task-delete.guard';
import { TaskModel } from '../models/task.model';
import { TaskService } from '../services/task.service';
import { VacationResolutionService } from '../services/vacation-resolution.service';

@ApiBearerAuth()
@ApiUseTags('Tasks')
@Controller('tasks')
export class TasksController {
  constructor(private taskService: TaskService, private vacationResolution: VacationResolutionService) {}

  @Get()
  async getTasks(@Res() res) {
    const tasks = await this.taskService.getTasks();
    return res.status(HttpStatus.OK).json(tasks);
  }

  @Get('/tasks-author/:author')
  async getTasksByAuthor(@Res() res, @Param('author') author) {
    const tasks = await this.taskService.getTasksByAuthor(author);
    return res.status(HttpStatus.OK).json(tasks);
  }

  @Get('/tasks-employee/:employee')
  async getTasksByEmployee(@Res() res, @Param('employee') employee) {
    const tasks = await this.taskService.getTasksByEmployee(employee);
    return res.status(HttpStatus.OK).json(tasks);
  }

  @Get('/tasks-month/:date')
  async getTasksByMonth(@Res() res, @Param('date') date) {
    const tasks = await this.taskService.getTasksByMonth(date);
    return res.status(HttpStatus.OK).json(tasks);
  }

  @Post()
  async addTask(@Res() res, @Body() task: TaskModel) {
    const newTask = await this.taskService.addTask(task);
    return res.status(HttpStatus.OK).json(newTask);
  }

  @Put('/:id')
  async update(@Res() res, @Param('id') id, @Body() task: Partial<TaskModel>) {
    const newTask = await this.taskService.udpdateOne(id, task);
    return res.status(HttpStatus.OK).json(newTask);
  }

  @Delete('/:id')
  @UseGuards(TaskDeleteGuard)
  async delete(@Res() res, @Param('id') id) {
    const result = await this.taskService.deleteById(id);

    return res.status(HttpStatus.OK).json(result);
  }

  @Post('/resolution/:taskId')
  @UseInterceptors(FileInterceptor('file'))
  async uploadResolution(@Res() res, @UploadedFile() file, @Param('taskId') taskId: string) {
    const task = await this.vacationResolution.updateTaskResolutionById(taskId, file);

    return res.status(HttpStatus.OK).json(task);
  }

  @Get('/resolution/:taskId')
  async getResolution(@Res() res: Response, @Param('taskId') taskId: string) {
    const result = await this.vacationResolution.getFileByTaskId(taskId);

    res.set('content-disposition', `attachment; filename="${result.name}"`).send(result.file);
  }
}
