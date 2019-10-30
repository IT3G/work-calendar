import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { UsersService } from '../users/services/users.service';
import { LoginRequestModel } from './models/login.request.model';
import { LdapService } from './services/ldap.service';
@Controller('auth')
export class AuthController {
  constructor(
    private readonly ldapService: LdapService,
    private readonly usersService: UsersService,
  ) {}
  @Post()
  async auth(@Res() res, @Body() credentials: LoginRequestModel) {
    try {
      const ldapResult = await this.ldapService.auth(credentials);
      const result = await this.usersService.getUserByLogin(
        ldapResult.mailNickname,
      );
      if (result.length) {
        res.status(HttpStatus.OK).send(result[0]);
      } else {
        const newUser = await this.usersService.addUser(ldapResult);
        res.status(HttpStatus.OK).send(newUser);
      }
    } catch (e) {
      res.status(HttpStatus.NOT_ACCEPTABLE).send('USER NOT FOUND');
    }
  }
}
