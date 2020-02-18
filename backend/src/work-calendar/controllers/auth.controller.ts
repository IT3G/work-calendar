import { Body, Controller, Get, HttpStatus, Post, Req, Res } from '@nestjs/common';
import { ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { LoginModel } from '../models/login.model';
import { LdapService } from '../services/ldap.service';
import { UsersService } from '../services/users.service';
import { AuthService } from '../services/auth.service';
import { Config } from '../../config/config';
@ApiBearerAuth()
@ApiUseTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private ldapService: LdapService,
    private usersService: UsersService,
    private authService: AuthService,
    private config: Config
  ) {}
  @Post()
  async auth(@Res() res: Response, @Body() credentials: LoginModel) {
    try {
      const user = await this.authService.auth(credentials);
      user.hashPassword = `Bearer ${this.authService.getJWTbyUser(user)}`;
      res.status(HttpStatus.OK).send(user);
    } catch (e) {
      res.status(HttpStatus.NOT_ACCEPTABLE).send(e.message ? e.message : e);
    }
  }

  @Get('/current')
  async getCurrentUser(@Req() req: Request, @Res() res: Response) {
    try {
      const authHeader = req.header('Authorization');
      const [bearer, jwt] = authHeader.split(' ');

      const user = await this.authService.verifyAndGetUser(jwt);
      res.status(HttpStatus.OK).send(user);
    } catch (e) {
      res.status(HttpStatus.NOT_ACCEPTABLE).send('user not found');
    }
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
