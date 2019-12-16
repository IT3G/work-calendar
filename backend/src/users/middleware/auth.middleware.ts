import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private authService: AuthService) {}

  async use(req: Request, res: Response, next: Function) {
    if (req.originalUrl === '/auth') {
      next();
      return;
    }

    const cookies = req.signedCookies;

    if (!cookies || !cookies.JWT) {
      throw new UnauthorizedException();
    }

    try {
      this.authService.verifyUser(cookies.JWT);
    } catch (e) {
      throw new UnauthorizedException();
    }

    next();
  }
}
