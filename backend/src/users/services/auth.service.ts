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
    private config: Config
  ) {
  }

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

    if (user && user.hashPassword !== crypto.createHmac('sha256', credentials.password).digest('hex')) {
      throw new Error('USER NOT FOUND');
    }

    return user;
  }

  private async authLdap(credentials: LoginModel): Promise<UserEntity> {
    const user = await this.usersService.getUserByLogin(credentials.username);
    const ldapResult = await this.ldapService.auth(credentials);

    if (!ldapResult) {
      return Promise.reject('USER NOT FOUND');
    }

    return user || this.usersService.addUser(ldapResult);
  }

  getJWTbyUser(user: UserEntity): string {
    const sign: JwtSignModel = {
      mailNickname: user.mailNickname,
      username: user.username,
      location: user.location,
      position: user.position,
      email: user.email
    };

    return this.jwtService.sign(sign);
  }

  async verifyAndGetUser(jwt: string): Promise<UserEntity> {
    if (!jwt) {
      return Promise.reject('JWT not found');
    }

    const res: JwtSignModel = this.jwtService.verify(jwt);
    const user = await this.usersService.getUserByLogin(res.mailNickname);
    return user;
  }


  async doSmth(): Promise<string> {
    if ('odd') {
      return Promise.resolve('odd');
    }

    await this.test();

    return Promise.reject('Fuck you');
  }

  doSmth3(): Promise<string> {
    if ('odd') {
      return Promise.resolve('odd');
    }

    this.test().then((data) => {
      // do smth with data
    });

    return Promise.reject('Fuck you');
  }


  async doSmth2(): Promise<string> {
    if ('odd') {
      return 'odd';
    }

    throw new Error('Fuck you');
  }


  doSmth4(): Promise<string> {
    return new Promise((resolve, reject) => {

      if ('odd') {
        resolve('odd');
      }

      reject('Fuck you');
    });
  }

  async test() {
    const test = await this.doSmth2();
  }
}
