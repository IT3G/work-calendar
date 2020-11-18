import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
import * as moment from 'moment';
import { Config } from '../../config/config';
import { UserEntity } from '../../entity/entities/user.entity';
import { UserDto } from '../../profile/dto/user.dto';
import { UsersService } from '../../profile/services/users.service';
import { LoginModel } from '../models/login.model';
import { LdapService } from './ldap.service';

@Injectable()
export class AuthService {
  constructor(private ldapService: LdapService, private usersService: UsersService, private config: Config) {}

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
      return user;
    } else {
      const newUser = await this.usersService.addUser(ldapResult);
      return newUser;
    }
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
      whenCreated: moment().toISOString(),
      email: `${userInfo.username}${emailPostfix}`,
      telNumber: null,
      physicalDeliveryOfficeName: null,
      mailNickname: userInfo.username,
      isAdmin: false,
      hasMailing: false,
      subdivision: null,
      jobPosition: null,
      projectsNew: null,
      skype: null,
      telegram: null,
      authType: 'hash',
      terminationDate: null,
      lastProjects: null,
      hashPassword: crypto.createHmac('sha256', userInfo.password).digest('hex'),
      skills: null,
      birthday: null,
      remoteWork: null,
      lastTimeOnline: moment().toISOString(),
      mattermost: null,
      birthdayHideYear: null,
    };

    const user = await this.usersService.getUserByLogin(data.username);

    if (user) {
      return user;
    } else {
      const newUser = await this.usersService.addUser(data);
      return newUser;
    }
  }
}
