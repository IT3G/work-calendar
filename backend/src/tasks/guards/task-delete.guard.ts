import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { AuthService } from '../../users/services/auth.service';
import { Request } from 'express';
import { TaskService } from '../services/task.service';
import { UsersService } from '../../users/services/users.service';
import * as moment from 'moment';

/** Guard для контроля запроса удаления Задачи */
@Injectable()
export class TaskDeleteGuard implements CanActivate {
  constructor(private authService: AuthService, private taskService: TaskService, private usersService: UsersService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const taskId: string = request.params.id;

    if (!taskId) {
      return false;
    }

    const authUser = await this.authService.verifyByRequesAndGetUser(request);
    const task = await this.taskService.getTaskById(taskId);

    /** админ может удалить */
    if (authUser.isAdmin) {
      return true;
    }

    /** владелец может удалить свое событие, которое еще не началось */
    if (task.employee === authUser.mailNickname && moment(task.dateStart).isSameOrAfter(moment(), 'day')) {
      return true;
    }

    return false;
  }
}
