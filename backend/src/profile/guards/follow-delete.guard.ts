import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { FollowEntity } from '../../entity/entities/follow.entity.model';
import { TokenService } from '../../work-calendar/services/token.service';
import { FollowService } from '../services/follow.service';
import { AdminActionGuard } from './admin-action.guard';

/** Guard для контроля запроса удаления Задачи */
@Injectable()
export class FollowDeleteGuard implements CanActivate {
  constructor(
    private tokenService: TokenService,
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

    const authUser = await this.tokenService.verifyByRequesAndGetUser(request);
    const follow: FollowEntity = await this.followService.getOneFollowsByID(followId);

    /** владелец может удалить свои подписки */
    return (
      follow.followerId.id.toString() === authUser.id.toString() ||
      follow.followingId.id.toString() === authUser.id.toString()
    );
  }
}
