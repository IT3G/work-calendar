import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response } from 'express';
import { Config } from '../../config/config';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private authService: AuthService, private config: Config) {}

  async use(req: Request, res: Response, next: Function) {
    const urls: string[] = JSON.parse(this.config.UNAUTH_URLS);

    const isUnauthUrl = urls.includes(req.baseUrl) || urls.some(u => u.includes('**') && req.baseUrl.includes(u));
    if (isUnauthUrl) {
      next();
      return;
    }

    try {
      const authHeader = req.header('Authorization');
      const [bearer, jwt] = authHeader.split(' ');

      await this.authService.verifyAndGetUser(jwt);
    } catch (e) {
      throw new UnauthorizedException();
    }

    next();
  }
}
