import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response } from 'express';
import { Config } from '../../config/config';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private authService: AuthService, private config: Config) {}

  async use(req: Request, res: Response, next: Function) {
    if (req.originalUrl === this.config.AUTH_URL) {
      next();
      return;
    }

    const cookies = req.signedCookies;

    if (!cookies) {
      throw new UnauthorizedException();
    }

    try {
      this.authService.verifyAndGetUser(cookies[this.config.JWT_COOKIE_NAME]);
    } catch (e) {
      throw new UnauthorizedException();
    }

    next();
  }
}
