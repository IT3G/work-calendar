import { Body, Controller, Get, NotAcceptableException, Post, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags } from '@nestjs/swagger';
import { Request } from 'express';
import { UserDto } from '../../profile/dto/user.dto';
import { UserEntityToDtoMapper } from '../../profile/mappers/user-entity-to-dto.mapper';
import { UsersService } from '../../profile/services/users.service';
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
    private entityToDtoMapper: UserEntityToDtoMapper
  ) {}

  @Post()
  async auth(@Body() credentials: LoginModel): Promise<UserDto> {
    try {
      const user = await this.authService.auth(credentials);
      user.hashPassword = `Bearer ${this.authService.getJWTbyUser(user)}`;
      return this.entityToDtoMapper.map(user);
    } catch (e) {
      throw new NotAcceptableException(e.message ? e.message : e);
    }
  }

  @Get('/current')
  async getCurrentUser(@Req() req: Request): Promise<UserDto> {
    try {
      const user = await this.authService.verifyByRequesAndGetUser(req);
      return this.entityToDtoMapper.map(user);
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

      return this.entityToDtoMapper.map(newUser);
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
      return this.entityToDtoMapper.map(newUser);
    } catch (e) {
      throw new NotAcceptableException('user not found');
    }
  }
}
