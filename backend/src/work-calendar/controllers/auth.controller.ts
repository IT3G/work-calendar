import { Body, Controller, Get, NotAcceptableException, Post, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags } from '@nestjs/swagger';
import { Request } from 'express';
import { UsersService } from '../../profile/services/users.service';
import { LoginModel } from '../models/login.model';
import { AuthService } from '../services/auth.service';
import { LdapService } from '../services/ldap.service';
@ApiBearerAuth()
@ApiUseTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private ldapService: LdapService, private usersService: UsersService, private authService: AuthService) {}

  @Post()
  async auth(@Body() credentials: LoginModel) {
    try {
      const user = await this.authService.auth(credentials);
      user.hashPassword = `Bearer ${this.authService.getJWTbyUser(user)}`;
      return user;
    } catch (e) {
      throw new NotAcceptableException(e.message ? e.message : e);
    }
  }

  @Get('/current')
  async getCurrentUser(@Req() req: Request) {
    try {
      const user = await this.authService.verifyByRequesAndGetUser(req);
      return user;
    } catch (e) {
      throw new NotAcceptableException('user not found');
    }
  }

  @Post('/add')
  async authAndAdd(@Body() credentials: LoginModel) {
    try {
      const ldapResult = await this.ldapService.auth(credentials, true);
      const user = await this.usersService.getUserByLogin(ldapResult.mailNickname);

      if (user) {
        throw new NotAcceptableException('user alredy exist');
      }

      const newUser = await this.usersService.addUser(ldapResult);

      return newUser;
    } catch (e) {
      throw new NotAcceptableException('user not found');
    }
  }

  @Post('/registration')
  async registration(@Body() credentials: LoginModel) {
    try {
      const user = await this.usersService.getUserByLogin(credentials.username);

      if (user) {
        throw new NotAcceptableException('user alredy exist');
      }

      const newUser = await this.authService.registration(credentials);
      return newUser;
    } catch (e) {
      throw new NotAcceptableException('user not found');
    }
  }
}
