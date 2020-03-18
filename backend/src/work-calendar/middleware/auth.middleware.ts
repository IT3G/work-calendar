import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response } from 'express';
import { Config } from '../../config/config';
import { TokenService } from '../services/token.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private tokenService: TokenService, private config: Config) {}

  async use(req: Request, res: Response, next: () => void) {
    const urls: string[] = JSON.parse(this.config.UNAUTH_URLS);

    const isUnauthUrl =
      urls.includes(req.baseUrl) || urls.some(u => u.includes('/**') && req.baseUrl.includes(u.replace('/**', '')));

    if (isUnauthUrl) {
      next();
      return;
    }

    try {
      await this.tokenService.verifyByRequesAndGetUser(req);
    } catch (e) {
      throw new UnauthorizedException();
    }

    next();
  }
}
