import { Injectable, NotFoundException, NotAcceptableException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Config } from '../../config/config';
import { UserEntity } from '../../entity/entities/user.entity';
import { UsersService } from '../../profile/services/users.service';
import { v4 as uuidv4 } from 'uuid';
import { JwtRefreshSignModel } from '../models/jwt-refresh-sign.model';
import { RefreshTokenEntity } from '../../entity/entities/refresh-token.entity.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
// tslint:disable-next-line: no-var-requires
const ms = require('ms');

@Injectable()
export class RefreshTokenService {
  constructor(
    @InjectModel('RefreshToken') private readonly refreshTokenModel: Model<RefreshTokenEntity>,
    private jwtService: JwtService,
    private config: Config,
    private readonly usersService: UsersService
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

  async verifyAndGetUser(token: string): Promise<UserEntity> {
    if (!token) {
      throw new NotAcceptableException('No token provided');
    }
    try {
      const res: JwtRefreshSignModel = this.jwtService.verify(token);
      const tokenEntity = await this.getTokenByParams({ token });
      if (!tokenEntity) {
        throw new NotFoundException('Token not found');
      }

      return await this.usersService.getUserById(tokenEntity.userId);
    } catch (e) {
      throw new NotAcceptableException();
    }
  }

  private async getTokenByParams(params: Partial<RefreshTokenEntity>): Promise<RefreshTokenEntity> {
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
