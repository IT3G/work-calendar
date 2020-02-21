import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  NotAcceptableException,
  NotFoundException,
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
import { FileStorageService } from '../../file-storage/services/file-storage.service';
import { TaskDeleteGuard } from '../guards/task-delete.guard';
import { TaskModel } from '../models/task.model';
import { TaskService } from '../services/task.service';

@ApiBearerAuth()
@ApiUseTags('Tasks')
@Controller('tasks')
export class TasksController {
  private readonly resolutionsFolderName = 'resolutions/';

  constructor(private taskService: TaskService, private fileStorage: FileStorageService) {}

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

  @Post('/resolution')
  @UseInterceptors(FileInterceptor('file'))
  uploadResolution(@UploadedFile() file) {
    try {
      this.fileStorage.putObject(`${this.resolutionsFolderName}${file.originalname}`, file.buffer);
    } catch (e) {
      throw new NotAcceptableException('Ошибка при загрузке файла');
    }
  }

  @Get('/resolution/:name')
  async getResolution(@Res() res: Response, @Param('name') name: string) {
    try {
      const file = await this.fileStorage.getObject(`${this.resolutionsFolderName}${name}`);
      res.send(file);
    } catch (error) {
      throw new NotFoundException('Файл не найден');
    }
  }

  @Delete('/resolution/:name')
  async removeObject(@Res() res: Response, @Param('name') name: string) {
    try {
      const file = await this.fileStorage.removeObject(`${this.resolutionsFolderName}${name}`);
      res.send(file);
    } catch (error) {
      throw new NotAcceptableException('Ошибка при удалении файла');
    }
  }
}
