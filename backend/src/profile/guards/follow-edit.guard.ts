import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from '../../work-calendar/services/auth.service';
import { FollowDto } from '../dto/follow.dto';
import { AdminActionGuard } from './admin-action.guard';

/** Guard для контроля запроса удаления Задачи */
@Injectable()
export class FollowEditGuard implements CanActivate {
  constructor(private authService: AuthService, private adminActionGuard: AdminActionGuard) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const follow: FollowDto = request.body;

    if (!follow) {
      return false;
    }

    /** администратор может удалять без доп. проверок ниже */
    if (await this.adminActionGuard.canActivate(context)) {
      return true;
    }

    const authUser = await this.authService.verifyByRequesAndGetUser(request);
    /** владелец может изменять свои подписки */
    return (
      follow.followerId._id.toString() === authUser.id.toString() ||
      follow.followingId._id.toString() === authUser.id.toString()
    );
  }
}
