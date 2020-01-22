import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as crypto from 'crypto';
import { Config } from '../../config/config';
import { JwtSignModel } from '../models/jwt-sign.model';
import { LoginModel } from '../models/login.model';
import { LdapService } from './ldap.service';
import { UsersService } from './users.service';
import { UserEntity } from '../../entity/entities/user.entity.model';

@Injectable()
export class AuthService {
  constructor(
    private readonly ldapService: LdapService,
    private readonly usersService: UsersService,
    private jwtService: JwtService,
    private config: Config,
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

  getJWTbyUser(user: UserEntity): string {
    const sign: JwtSignModel = {
      mailNickname: user.mailNickname,
      username: user.username,
      location: user.location,
      position: user.position,
      email: user.email,
    };

    return this.jwtService.sign(sign);
  }

  async verifyAndGetUser(jwt: string): Promise<UserEntity> {
    if (!jwt) {
      return Promise.reject('JWT not found');
    }

    const res: JwtSignModel = this.jwtService.verify(jwt);
    return await this.usersService.getUserByLogin(res.mailNickname);
  }
}
