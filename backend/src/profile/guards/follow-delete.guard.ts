import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { AdminActionGuard } from './admin-action.guard';
import { AuthService } from '../../work-calendar/services/auth.service';
import { FollowService } from '../services/follow.service';
import { FollowEntity } from '../../entity/entities/follow.entity.model';

/** Guard для контроля запроса удаления Задачи */
@Injectable()
export class FollowDeleteGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private followService: FollowService,
    private adminActionGuard: AdminActionGuard
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const followId: string = request.params.id;

    if (!followId) {
      return false;
    }

    /** администратор может удалять без доп. проверок ниже */
    if (await this.adminActionGuard.canActivate(context)) {
      return true;
    }

    const authUser = await this.authService.verifyByRequesAndGetUser(request);
    const follow: FollowEntity = await this.followService.getOneFollowsByID(followId);

    /** владелец может удалить свои подписки */
    return (
      follow.followerId.id.toString() === authUser.id.toString() ||
      follow.followingId.id.toString() === authUser.id.toString()
    );
  }
}
