import { HttpModule, HttpService, Module } from '@nestjs/common';
import { Config, getConfig } from '../config/config';
import { EntityModule } from '../entity/entity.module';
import { AuthController } from './auth.controller';
import { AvatarsController } from './avatars.controller';
import { AvatarsService } from './services/avatars/avatars.service';
import { ConfluenceAvatarService } from './services/avatars/confluence-avatars.service';
import { DefaultAvatarsService } from './services/avatars/default-avatars.service';
import { LdapService } from './services/ldap.service';
import { UsersService } from './services/users.service';
import { UsersController } from './users.controller';

const avatarServiceProvider = {
  provide: AvatarsService,
  useFactory: (http: HttpService, config: Config) => {
    if (config.FEATURE_AVATAR_SOURCE === 'CONFLUENCE') {
      return new ConfluenceAvatarService(http, config);
    } else {
      return new DefaultAvatarsService(http);
    }
  },
  inject: [HttpService, Config]
};

@Module({
  imports: [EntityModule, HttpModule],
  controllers: [UsersController, AuthController, AvatarsController],
  providers: [UsersService, LdapService, avatarServiceProvider, { provide: Config, useValue: getConfig() }]
})
export class UsersModule {}
