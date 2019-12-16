import { HttpModule, HttpService, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
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

const config = getConfig();

const avatarServiceProvider = {
  provide: AvatarsService,
  useFactory: (http: HttpService, config: Config) => {
    if (config.FEATURE_AVATAR_SOURCE === 'CONFLUENCE') {
      return new ConfluenceAvatarService(http, config);
    } else {
      return new DefaultAvatarsService(http);
    }
  },
  inject: [HttpService, Config],
};

@Module({
  imports: [
    EntityModule,
    HttpModule,
    JwtModule.register({
      secret: config.JWT_SECRET_KEY,
      signOptions: { expiresIn: config.JWT_EXPIRES },
    }),
  ],
  controllers: [UsersController, AuthController, AvatarsController],
  providers: [UsersService, LdapService, avatarServiceProvider, { provide: Config, useValue: config }],
})
export class UsersModule {}
