import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as crypto from 'crypto';
import { Request } from 'express';
import { Config } from '../../config/config';
import { UserEntity } from '../../entity/entities/user.entity';
import { UserDto } from '../../profile/dto/user.dto';
import { UsersService } from '../../profile/services/users.service';
import { JwtSignModel } from '../models/jwt-sign.model';
import { LoginModel } from '../models/login.model';
import { LdapService } from './ldap.service';
import { v4 as uuidv4 } from 'uuid';
import { JwtRefreshSignModel } from '../models/jwt-refresh-sign.model';

@Injectable()
export class AuthService {
  constructor(
    private readonly ldapService: LdapService,
    private readonly usersService: UsersService,
    private jwtService: JwtService,
    private config: Config
  ) {}

  async auth(credentials: LoginModel) {
    let user: UserEntity;

    if (this.config.FEATURE_AUTH_TYPE !== 'LDAP') {
      user = await this.authLocal(credentials);
    } else {
      user = await this.authLdap(credentials);
    }

    return user;
  }

  private async authLocal(credentials: LoginModel): Promise<UserEntity> {
    const user = await this.usersService.getUserByLogin(credentials.username);

    if (user && user.hashPassword === crypto.createHmac('sha256', credentials.password).digest('hex')) {
      return Promise.resolve(user);
    }

    return Promise.reject('USER NOT FOUND');
  }

  private async authLdap(credentials: LoginModel): Promise<UserEntity> {
    const user = await this.usersService.getUserByLogin(credentials.username);

    const ldapResult = await this.ldapService.auth(credentials);

    if (!ldapResult) {
      return Promise.reject('USER NOT FOUND');
    }

    if (user) {
      return Promise.resolve(user);
    } else {
      const newUser = await this.usersService.addUser(ldapResult);
      return Promise.resolve(newUser);
    }
  }

  getJWTTokensForUser(user: UserEntity): { accessKey: string; refreshToken: string } {
    const sign: JwtSignModel = {
      mailNickname: user.mailNickname,
      username: user.username,
      location: user.location,
      position: user.position,
      email: user.email
    };
    const accessKey = this.jwtService.sign(sign);

    const refreshSign: JwtRefreshSignModel = {
      mailNickname: user.mailNickname,
      refresh: uuidv4()
    };
    const refreshToken = this.jwtService.sign(refreshSign, { expiresIn: this.config.JWT_REFRESH_EXPIRES });

    this.usersService.storeRefreshToken(refreshSign.mailNickname, refreshSign.refresh);

    return { accessKey, refreshToken };
  }

  /** подтвердить валидность сеесси и получить автоизованного Пользователя по запросу */
  async verifyByRequesAndGetUser(req: Request): Promise<UserEntity> {
    const authHeader = req.header('Authorization');
    const [bearer, jwt] = authHeader.split(' ');

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

  async registration(userInfo: LoginModel): Promise<UserEntity> {
    const emailPostfix =
      this.config.FEATURE_AUTH_TYPE === 'LDAP' && this.config.MAIL_POSTFIX ? `@${this.config.MAIL_POSTFIX}` : '';

    const data: UserDto = {
      _id: undefined,
      username: userInfo.name,
      patronymic: null,
      location: null,
      position: null,
      whenCreated: null,
      email: `${userInfo.username}${emailPostfix}`,
      telNumber: null,
      physicalDeliveryOfficeName: null,
      mailNickname: userInfo.username,
      isAdmin: false,
      hasMailing: false,
      subdivision: null,
      jobPosition: null,
      projectsNew: null,
      accessKey: null,
      refreshToken: null,
      skype: null,
      telegram: null,
      authType: 'hash',
      terminationDate: null,
      lastProjects: null,
      hashPassword: crypto.createHmac('sha256', userInfo.password).digest('hex')
    };

    return this.usersService.addUser(data);
  }
}
