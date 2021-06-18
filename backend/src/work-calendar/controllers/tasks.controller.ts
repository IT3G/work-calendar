import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiUseTags } from '@nestjs/swagger';
import { Response } from 'express';
import { CustomMapper } from '../../shared/services/custom-mapper.service';
import { PresenceDto } from '../dto/presence.dto';
import { TaskRequestDto } from '../dto/task-request.dto';
import { TaskDto } from '../dto/task.dto';
import { TaskDeleteGuard } from '../guards/task-delete.guard';
import { TaskService } from '../services/task.service';
import { VacationResolutionService } from '../services/vacation-resolution.service';

const encodeUrl = require('encodeurl');

@ApiBearerAuth()
@ApiUseTags('Tasks')
@Controller('tasks')
export class TasksController {
  constructor(
    private taskService: TaskService,
    private vacationResolution: VacationResolutionService,
    private mapper: CustomMapper
  ) {}

  @Get()
  async getTasks(): Promise<TaskDto[]> {
    const tasks = await this.taskService.getTasks();

    return this.mapper.mapArray(TaskDto, tasks);
  }

  @Get('/tasks-author/:author')
  async getTasksByAuthor(@Param('author') author): Promise<TaskDto[]> {
    const tasks = await this.taskService.getTasksByAuthor(author);

    return this.mapper.mapArray(TaskDto, tasks);
  }

  @Get('/tasks-employee/:employee')
  async getTasksByEmployee(@Param('employee') employee): Promise<TaskDto[]> {
    const tasks = await this.taskService.getTasksByEmployee(employee);

    return this.mapper.mapArray(TaskDto, tasks);
  }

  @Post('/tasks-month')
  async getTasksByMonth(@Body() taskRequest: TaskRequestDto): Promise<PresenceDto[]> {
    const presence = await this.taskService.getTasksByMonth(taskRequest);

    return this.mapper.mapArray(PresenceDto, presence);
  }

  @Post()
  async addTask(@Body() task: TaskDto): Promise<TaskDto> {
    const newTask = await this.taskService.addTask(task);

    return this.mapper.map(TaskDto, newTask);
  }

  @Put('/:id')
  async update(@Param('id') id, @Body() task: Partial<TaskDto>): Promise<TaskDto> {
    const newTask = await this.taskService.udpdateOne(id, task);

    return this.mapper.map(TaskDto, newTask);
  }

  @Delete('/:id')
  @UseGuards(TaskDeleteGuard)
  async delete(@Param('id') id): Promise<TaskDto> {
    const result = await this.taskService.deleteById(id);

    return this.mapper.map(TaskDto, result);
  }

  @Post('/resolution/:taskId')
  @UseInterceptors(FileInterceptor('file'))
  async uploadResolution(@UploadedFile() file, @Param('taskId') taskId: string): Promise<TaskDto> {
    const task = await this.vacationResolution.updateTaskResolutionById(taskId, file);

    return this.mapper.map(TaskDto, task);
  }

  @Get('/resolution/:taskId')
  async getResolution(@Res() res: Response, @Param('taskId') taskId: string) {
    const result = await this.vacationResolution.getFileByTaskId(taskId);

    res.set('content-disposition', `attachment; filename="${encodeUrl(result.name)}"`).send(result.file);
  }
}
