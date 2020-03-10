import { Body, Controller, Get, NotAcceptableException, Post, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags } from '@nestjs/swagger';
import { Request } from 'express';
import { UserDto } from '../../profile/dto/user.dto';
import { UsersService } from '../../profile/services/users.service';
import { CustomMapper } from '../../shared/services/custom-mapper.service';
import { LoginModel } from '../models/login.model';
import { AuthService } from '../services/auth.service';
import { LdapService } from '../services/ldap.service';
@ApiBearerAuth()
@ApiUseTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private ldapService: LdapService,
    private usersService: UsersService,
    private authService: AuthService,
    private mapper: CustomMapper
  ) {}

  @Post()
  async auth(@Body() credentials: LoginModel): Promise<UserDto> {
    try {
      const userEntity = await this.authService.auth(credentials);

      const dto = this.mapper.map(UserDto, userEntity);

      dto.accessKey = `Bearer ${this.authService.getJWTbyUser(userEntity)}`;
      return dto;
    } catch (e) {
      throw new NotAcceptableException(e.message ? e.message : e);
    }
  }

  @Get('/current')
  async getCurrentUser(@Req() req: Request): Promise<UserDto> {
    try {
      const user = await this.authService.verifyByRequesAndGetUser(req);
      return this.mapper.map(UserDto, user);
    } catch (e) {
      throw new NotAcceptableException('user not found');
    }
  }

  @Post('/add')
  async authAndAdd(@Body() credentials: LoginModel): Promise<UserDto> {
    try {
      const ldapResult = await this.ldapService.auth(credentials, true);
      const user = await this.usersService.getUserByLogin(ldapResult.mailNickname);

      if (user) {
        throw new NotAcceptableException('user alredy exist');
      }

      const newUser = await this.usersService.addUser(ldapResult);

      return this.mapper.map(UserDto, newUser);
    } catch (e) {
      throw new NotAcceptableException('user not found');
    }
  }

  @Post('/registration')
  async registration(@Body() credentials: LoginModel): Promise<UserDto> {
    try {
      const user = await this.usersService.getUserByLogin(credentials.username);

      if (user) {
        throw new NotAcceptableException('user alredy exist');
      }

      const newUser = await this.authService.registration(credentials);
      return this.mapper.map(UserDto, newUser);
    } catch (e) {
      throw new NotAcceptableException('user not found');
    }
  }
}
