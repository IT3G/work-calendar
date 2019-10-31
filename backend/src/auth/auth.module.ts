import { Module } from '@nestjs/common';
import { Config, getConfig } from '../config/config';
import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller';
import { LdapService } from './services/ldap.service';

@Module({
  imports: [UsersModule],
  controllers: [AuthController],
  providers: [LdapService, { provide: Config, useValue: getConfig() }]
})
export class AuthModule {}
