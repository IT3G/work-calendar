import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Config } from '../../config/config';
import { UserEntity } from '../../entity/entities/user.entity';
import { UsersService } from '../../profile/services/users.service';
import { v4 as uuidv4 } from 'uuid';
import { JwtRefreshSignModel } from '../models/jwt-refresh-sign.model';

@Injectable()
export class RefreshTokenService {
  constructor(private jwtService: JwtService, private config: Config, private readonly usersService: UsersService) {}

  generateRefreshToken(user: UserEntity): string {
    const login = user.mailNickname;
    const refreshSign: JwtRefreshSignModel = {
      mailNickname: login,
      refresh: uuidv4()
    };
    const refreshToken = this.jwtService.sign(refreshSign, { expiresIn: this.config.JWT_REFRESH_EXPIRES });

    this.saveRefreshToken(login, refreshSign.refresh);
    this.removeOutdatedTokens(login);

    return refreshToken;
  }

  async verifyAndGetUser(token: string): Promise<UserEntity> {
    if (!token) {
      return Promise.reject('No token provided');
    }

    const res: JwtRefreshSignModel = this.jwtService.verify(token);
    const user = await this.usersService.getUserByLogin(res.mailNickname);

    const isValidToken = user.refreshTokens.some(i => i.token === res.refresh);
    if (!isValidToken) {
      return Promise.reject('Invalid token');
    }

    return user;
  }

  /** Сохранить новый токен */
  private saveRefreshToken(login: string, token: string): void {
    const date = new Date();
    this.usersService.storeRefreshToken(login, {
      date,
      token
    });
  }

  /** Удалить протухшие токены */
  private removeOutdatedTokens(login: string): void {
    const date = new Date();
    date.setDate(date.getDate() - Number.parseInt(this.config.JWT_REFRESH_EXPIRES.replace(/\D/g, ''), 10));
    this.usersService.removeOutdatedTokens(login, date);
  }
}
