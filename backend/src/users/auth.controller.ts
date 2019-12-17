import { Body, Controller, Get, HttpStatus, Post, Res } from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';
import { Response } from 'express';
import { Config } from '../config/config';
import { UsersService } from '../users/services/users.service';
import { LoginModel } from './models/login.model';
import { AuthService } from './services/auth.service';
import { LdapService } from './services/ldap.service';

@ApiUseTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private ldapService: LdapService,
    private usersService: UsersService,
    private authService: AuthService,
    private config: Config,
  ) {}
  @Post()
  async auth(@Res() res: Response, @Body() credentials: LoginModel) {
    try {
      const user = await this.authService.auth(credentials);
      res
        .status(HttpStatus.OK)
        .cookie(this.config.JWT_COOKIE_NAME, this.authService.getJWTbyUser(user), {
          httpOnly: true,
          signed: true,
          secure: this.config.JWT_ONLY_HTTPS === 'YES',
        })
        .send(user);
    } catch (e) {
      res.status(HttpStatus.NOT_ACCEPTABLE).send('e');
    }
  }

  @Get('/logout')
  async logout(@Res() res: Response) {
    res
      .clearCookie(this.config.JWT_COOKIE_NAME)
      .status(HttpStatus.CREATED)
      .send();
  }

  @Post('/add')
  async authAndAdd(@Res() res, @Body() credentials: LoginModel) {
    try {
      const ldapResult = await this.ldapService.auth(credentials, true);
      const user = await this.usersService.getUserByLogin(ldapResult.mailNickname);

      if (user) {
        res.status(HttpStatus.NOT_ACCEPTABLE).send('USER ALREADY EXIST');
        return;
      }

      const newUser = await this.usersService.addUser(ldapResult);
      res.status(HttpStatus.OK).send(newUser);
    } catch (e) {
      res.status(HttpStatus.NOT_ACCEPTABLE).send('USER NOT FOUND');
    }
  }

  @Post('/registration')
  async registration(@Res() res, @Body() credentials: LoginModel) {
    try {
      const user = await this.usersService.getUserByLogin(credentials.username);

      if (user) {
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
