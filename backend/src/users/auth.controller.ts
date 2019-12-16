import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';
import * as crypto from 'crypto';
import { Config } from '../config/config';
import { UsersService } from '../users/services/users.service';
import { LoginModel } from './models/login.model';
import { LdapService } from './services/ldap.service';

@ApiUseTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly ldapService: LdapService,
    private readonly usersService: UsersService,
    private config: Config,
  ) {}
  @Post()
  async auth(@Res() res, @Body() credentials: LoginModel) {
    const result = await this.usersService.getUserByLogin(credentials.username);

    /**pswd auth type */
    if (this.config.FEATURE_AUTH_TYPE !== 'LDAP') {
      if (result && result.hashPswd === crypto.createHmac('sha256', credentials.password).digest('hex')) {
        res.status(HttpStatus.OK).send(result);
      } else {
        res.status(HttpStatus.NOT_ACCEPTABLE).send('USER NOT FOUND');
      }

      return;
    }

    try {
      const ldapResult = await this.ldapService.auth(credentials);
      if (result) {
        res.status(HttpStatus.OK).send(result);
      } else {
        const newUser = await this.usersService.addUser(ldapResult);
        res.status(HttpStatus.OK).send(newUser);
      }
    } catch (e) {
      res.status(HttpStatus.NOT_ACCEPTABLE).send('USER NOT FOUND');
    }
  }

  @Post('/add')
  async authAndAdd(@Res() res, @Body() credentials: LoginModel) {
    try {
      const ldapResult = await this.ldapService.auth(credentials, true);
      const result = await this.usersService.getUserByLogin(ldapResult.mailNickname);
      if (result) {
        res.status(HttpStatus.NOT_ACCEPTABLE).send('USER ALREADY EXIST');
      } else {
        const newUser = await this.usersService.addUser(ldapResult);
        res.status(HttpStatus.OK).send(newUser);
      }
    } catch (e) {
      res.status(HttpStatus.NOT_ACCEPTABLE).send('USER NOT FOUND');
    }
  }

  @Post('/registration')
  async registration(@Res() res, @Body() credentials: LoginModel) {
    try {
      const result = await this.usersService.getUserByLogin(credentials.username);
      if (result) {
        res.status(HttpStatus.NOT_ACCEPTABLE).send('USER ALREADY EXIST');
        return;
      }
      const newUser = await this.usersService.registration(credentials);
      res.status(HttpStatus.OK).send(newUser);
    } catch (e) {
      res.status(HttpStatus.NOT_ACCEPTABLE).send('USER NOT FOUND');
    }
  }
}