import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Config } from '../../config/config';
import { UserEntity } from '../../entity/entities/user.entity';
import { UsersService } from '../../profile/services/users.service';
import { v4 as uuidv4 } from 'uuid';
import { JwtRefreshSignModel } from '../models/jwt-refresh-sign.model';
// tslint:disable-next-line: no-var-requires
const ms = require('ms');

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

    return refreshToken;
  }

  async verifyAndGetUser(token: string): Promise<UserEntity> {
    if (!token) {
      return Promise.reject('No token provided');
    }

    const res: JwtRefreshSignModel = this.jwtService.verify(token);

    const login = res.mailNickname;
    await this.removeOutdatedTokens(login);
    const user = await this.usersService.getUserByLogin(login);

    const tokenEntity = user.refreshTokens.find(i => i.token === res.refresh);

    if (!tokenEntity) {
      return Promise.reject('Invalid token');
    }

    /** Текущий токен удаляем чтобы не захламлять бд, т.к. на его место будет выдан новый */
    this.usersService.removeUserToken(login, tokenEntity._id);

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
  private removeOutdatedTokens(login: string): Promise<UserEntity> {
    const date = new Date();
    date.setMilliseconds(date.getMilliseconds() - ms(this.config.JWT_REFRESH_EXPIRES));
    return this.usersService.removeOutdatedTokens(login, date);
  }
}
