import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response } from 'express';
import { Config } from '../../config/config';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private authService: AuthService, private config: Config) {}

  async use(req: Request, res: Response, next: Function) {
    const urls = JSON.parse(this.config.UNAUTH_URLS);

    if (urls.includes(req.originalUrl)) {
      next();
      return;
    }

    const cookies = req.signedCookies;

    if (!cookies) {
      throw new UnauthorizedException();
    }

    try {
      await this.authService.verifyAndGetUser(cookies[this.config.JWT_COOKIE_NAME]);
    } catch (e) {
      throw new UnauthorizedException();
    }

    next();
  }
}
