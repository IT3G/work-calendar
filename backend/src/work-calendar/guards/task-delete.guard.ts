import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { Request } from 'express';
import { TaskService } from '../services/task.service';
import * as moment from 'moment';
import { AdminActionGuard } from './admin-action.guard';

/** Guard для контроля запроса удаления Задачи */
@Injectable()
export class TaskDeleteGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private taskService: TaskService,
    private adminActionGuard: AdminActionGuard
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const taskId: string = request.params.id;

    if (!taskId) {
      return false;
    }

    /** администратор может удалять без доп. проверок ниже */
    if (await this.adminActionGuard.canActivate(context)) {
      return true;
    }

    const authUser = await this.authService.verifyByRequesAndGetUser(request);
    const task = await this.taskService.getTaskById(taskId);

    /** владелец может удалить свое событие, которое еще не началось */
    if (task.employee === authUser.mailNickname && moment(task.dateStart).isSameOrAfter(moment(), 'day')) {
      return true;
    }

    return false;
  }
}
