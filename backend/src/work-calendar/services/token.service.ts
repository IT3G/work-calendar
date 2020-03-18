import { Injectable, NotAcceptableException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Request } from 'express';
import { Model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { Config } from '../../config/config';
import { RefreshTokenEntity } from '../../entity/entities/refresh-token.entity.model';
import { UserEntity } from '../../entity/entities/user.entity';
import { UsersService } from '../../profile/services/users.service';
import { JwtRefreshSignModel } from '../models/jwt-refresh-sign.model';
import { JwtSignModel } from '../models/jwt-sign.model';
// tslint:disable-next-line: no-var-requires
const ms = require('ms');

@Injectable()
export class TokenService {
  constructor(
    @InjectModel('RefreshToken') private readonly refreshTokenModel: Model<RefreshTokenEntity>,
    private jwtService: JwtService,
    private config: Config,
    private usersService: UsersService
  ) {}

  async generateRefreshToken(user: UserEntity): Promise<string> {
    const login = user.mailNickname;
    const refreshSign: JwtRefreshSignModel = {
      mailNickname: login,
      refresh: uuidv4()
    };

    const refreshToken = this.jwtService.sign(refreshSign, { expiresIn: this.config.JWT_REFRESH_EXPIRES });

    await this.createOrUpdateRefreshToken(user._id, refreshToken);

    return refreshToken;
  }

  async verifyAndGetRefreshToken(token: string): Promise<RefreshTokenEntity> {
    if (!token) {
      throw new NotAcceptableException('No token provided');
    }
    try {
      this.jwtService.verify(token);
      return await this.getRefreshTokenByParams({ token });
    } catch (e) {
      throw new NotAcceptableException();
    }
  }

  async getAccessTokensForUser(user: UserEntity): Promise<string> {
    const sign: JwtSignModel = {
      mailNickname: user.mailNickname,
      username: user.username,
      location: user.location,
      position: user.position,
      email: user.email
    };

    return `Bearer ${this.jwtService.sign(sign)}`;
  }

  /** подтвердить валидность сеесси и получить автоизованного Пользователя по запросу */
  async verifyByRequesAndGetUser(req: Request): Promise<UserEntity> {
    const authHeader = req.header('Authorization');
    const [, jwt] = authHeader.split(' ');

    return await this.verifyAndGetUser(jwt);
  }

  /** подтвердить валидность сеесси и получить автоизованного Пользователя по JWT */
  async verifyAndGetUser(jwt: string): Promise<UserEntity> {
    if (!jwt) {
      return Promise.reject('JWT not found');
    }

    const res: JwtSignModel = this.jwtService.verify(jwt);
    return await this.usersService.getUserByLogin(res.mailNickname);
  }

  private async getRefreshTokenByParams(params: Partial<RefreshTokenEntity>): Promise<RefreshTokenEntity> {
    return await this.refreshTokenModel.findOne(params);
  }

  private async createOrUpdateRefreshToken(userId: string, token: string): Promise<void> {
    const currentToken = await this.refreshTokenModel.findOne({ userId });

    if (currentToken) {
      await this.refreshTokenModel.findByIdAndUpdate(currentToken._id, { token, date: new Date() });
    } else {
      await this.refreshTokenModel.create({ token, date: new Date(), userId });
    }
  }
}
