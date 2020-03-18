import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { TokenService } from '../../work-calendar/services/token.service';

/** Guard для подтверждения полномочий роли Администратор */
@Injectable()
export class AdminActionGuard implements CanActivate {
  constructor(private tokenService: TokenService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const authUser = await this.tokenService.verifyByRequesAndGetUser(request);
    return authUser.isAdmin;
  }
}
