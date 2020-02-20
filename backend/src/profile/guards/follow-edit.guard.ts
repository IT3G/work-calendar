import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import * as moment from 'moment';
import { AdminActionGuard } from './admin-action.guard';
import { AuthService } from '../../work-calendar/services/auth.service';
import { FollowService } from '../services/follow.service';
import { FollowerModel } from '../models/follow.model';

/** Guard для контроля запроса удаления Задачи */
@Injectable()
export class FollowEditGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private followService: FollowService,
    private adminActionGuard: AdminActionGuard
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const follow: FollowerModel = request.body.data;

    if (!follow) {
      return false;
    }

    /** администратор может удалять без доп. проверок ниже */
    if (await this.adminActionGuard.canActivate(context)) {
      return true;
    }

    const authUser = await this.authService.verifyByRequesAndGetUser(request);

    /** владелец может изменять свои подписки */
    return follow.followerId === authUser.id || follow.followingId === authUser.id;
  }
}
