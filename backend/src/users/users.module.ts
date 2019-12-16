import { Module } from '@nestjs/common';
import { Config, getConfig } from '../config/config';
import { EntityModule } from '../entity/entity.module';
import { AuthController } from './auth.controller';
import { LdapService } from './services/ldap.service';
import { UsersService } from './services/users.service';
import { UsersController } from './users.controller';

@Module({
  imports: [EntityModule],
  controllers: [UsersController, AuthController],
  providers: [UsersService, LdapService, { provide: Config, useValue: getConfig() }]
})
export class UsersModule {}
