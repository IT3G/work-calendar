import { Body, Controller, Get, Logger, NotAcceptableException, Post, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags } from '@nestjs/swagger';
import { Request } from 'express';
import { UserDto } from '../../profile/dto/user.dto';
import { UsersService } from '../../profile/services/users.service';
import { CustomMapper } from '../../shared/services/custom-mapper.service';
import { LoginDto } from '../dto/login.dto';
import { LoginModel } from '../models/login.model';
import { AuthService } from '../services/auth.service';
import { LdapService } from '../services/ldap.service';
import { TokenService } from '../services/token.service';
@ApiBearerAuth()
@ApiUseTags('Auth')
@Controller('auth')
export class AuthController {
  private readonly logger = new Logger();

  constructor(
    private ldapService: LdapService,
    private usersService: UsersService,
    private authService: AuthService,
    private mapper: CustomMapper,
    private tokenService: TokenService
  ) {}

  @Post()
  async auth(@Body() credentials: LoginModel): Promise<LoginDto> {
    try {
      const userEntity = await this.authService.auth(credentials);

      const userDto = this.mapper.map(UserDto, userEntity);
      const accessKey = await this.tokenService.getAccessTokensForUser(userEntity);
      const refreshToken = await this.tokenService.generateRefreshToken(userEntity);

      return { accessKey, refreshToken, user: userDto };
    } catch (e) {
      throw new NotAcceptableException(e.message ? e.message : e);
    }
  }

  @Post('/token')
  async refreshToken(@Req() req: Request): Promise<LoginDto> {
    try {
      const token = req.header('RefreshToken');
      const newToken = await this.tokenService.verifyAndGetRefreshToken(token);
      const userEntity = await this.usersService.getUserById(newToken.userId);

      const userDto = this.mapper.map(UserDto, userEntity);
      const accessKey = await this.tokenService.getAccessTokensForUser(userEntity);
      const refreshToken = await this.tokenService.generateRefreshToken(userEntity);

      return { accessKey, refreshToken, user: userDto };
    } catch (e) {
      throw new NotAcceptableException('token unacceptable');
    }
  }

  @Get('/current')
  async getCurrentUser(@Req() req: Request): Promise<UserDto> {
    try {
      const user = await this.tokenService.verifyByRequesAndGetUser(req);
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
      this.logger.error(e);
      throw new NotAcceptableException('user not found');
    }
  }
}
