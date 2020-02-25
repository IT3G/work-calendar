import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { AuthService } from '../../work-calendar/services/auth.service';
import { Request } from 'express';

/** Guard для подтверждения полномочий роли Администратор */
@Injectable()
export class AdminActionGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const authUser = await this.authService.verifyByRequesAndGetUser(request);
    return authUser.isAdmin;
  }
}
