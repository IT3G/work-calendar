import { HttpModule, HttpService, MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { Config, getConfig } from '../config/config';
import { EntityModule } from '../entity/entity.module';
import { AvatarsService } from './services/avatars/avatars.service';
import { ConfluenceAvatarService } from './services/avatars/confluence-avatars.service';
import { DefaultAvatarsService } from './services/avatars/default-avatars.service';
import { UsersService } from './services/users.service';
import { FollowService } from './services/follow.service';
import { UsersController } from './controllers/users.controller';
import { AvatarsController } from './controllers/avatars.controller';
import { FollowController } from './controllers/follow.controller';
import { guards } from './guards';
import { AuthService } from '../work-calendar/services/auth.service';
import { LdapService } from '../work-calendar/services/ldap.service';
import { AdminActionGuard } from './guards/admin-action.guard';

const config = getConfig();

const avatarServiceProvider = {
  provide: AvatarsService,
  useFactory: (http: HttpService, conf: Config) => {
    if (config.FEATURE_AVATAR_SOURCE === 'CONFLUENCE') {
      return new ConfluenceAvatarService(http, conf);
    } else {
      return new DefaultAvatarsService(http);
    }
  },
  inject: [HttpService, Config]
};

@Module({
  imports: [
    EntityModule,
    HttpModule,
    JwtModule.register({
      secret: config.JWT_SECRET_KEY,
      signOptions: { expiresIn: config.JWT_EXPIRES }
    })
  ],
  controllers: [UsersController, AvatarsController, FollowController],
  providers: [
    UsersService,
    LdapService,
    AuthService,
    FollowService,
    AdminActionGuard,
    avatarServiceProvider,
    {
      provide: Config,
      useValue: config
    },
    ...guards
  ],
  exports: [UsersService, FollowService, AdminActionGuard]
})
export class ProfileModule {}
