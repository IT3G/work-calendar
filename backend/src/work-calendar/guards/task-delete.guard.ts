import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import * as moment from 'moment';
import { AdminActionGuard } from '../../profile/guards/admin-action.guard';
import { TaskService } from '../services/task.service';
import { TokenService } from '../services/token.service';

/** Guard для контроля запроса удаления Задачи */
@Injectable()
export class TaskDeleteGuard implements CanActivate {
  constructor(
    private tokenService: TokenService,
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

    const authUser = await this.tokenService.verifyByRequesAndGetUser(request);
    const task = await this.taskService.getTaskById(taskId);

    /** владелец может удалить свое событие, которое еще не началось */
    return task.employee === authUser.mailNickname && moment(task.dateStart).isSameOrAfter(moment(), 'day');
  }
}
