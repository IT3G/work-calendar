import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller';
import { LdapService } from './services/ldap.service';

@Module({
  imports: [UsersModule],
  controllers: [AuthController],
  providers: [LdapService],
})
export class AuthModule {}
