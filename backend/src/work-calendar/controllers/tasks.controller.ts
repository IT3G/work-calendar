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
import { EntityToDtoMapperService } from '../../shared/services/entity-to-dto-mapper.service';
import { TaskDto } from '../dto/task.dto';
import { TaskDeleteGuard } from '../guards/task-delete.guard';
import { TaskService } from '../services/task.service';
import { VacationResolutionService } from '../services/vacation-resolution.service';

@ApiBearerAuth()
@ApiUseTags('Tasks')
@Controller('tasks')
export class TasksController {
  constructor(
    private taskService: TaskService,
    private vacationResolution: VacationResolutionService,
    private mapper: EntityToDtoMapperService
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

  @Get('/tasks-month/:date')
  async getTasksByMonth(@Res() res, @Param('date') date) {
    const tasks = await this.taskService.getTasksByMonth(date);
    return res.status(HttpStatus.OK).json(tasks);
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
