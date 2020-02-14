import { HttpModule, HttpService, MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { Config, getConfig } from '../config/config';
import { EntityModule } from '../entity/entity.module';
import { AuthController } from './auth.controller';
import { AvatarsController } from './avatars.controller';
import { AuthMiddleware } from './middleware/auth.middleware';
import { AuthService } from './services/auth.service';
import { AvatarsService } from './services/avatars/avatars.service';
import { ConfluenceAvatarService } from './services/avatars/confluence-avatars.service';
import { DefaultAvatarsService } from './services/avatars/default-avatars.service';
import { LdapService } from './services/ldap.service';
import { UsersService } from './services/users.service';
import { UsersController } from './users.controller';
import { FollowController } from './follow.controller';
import { FollowService } from './services/follow.service';
import { EventEmitter } from 'events';

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
  controllers: [UsersController, AuthController, AvatarsController, FollowController],
  providers: [
    UsersService,
    FollowService,
    LdapService,
    FollowService,
    AuthService,
    avatarServiceProvider,
    { provide: Config, useValue: config }
  ],
  exports: [UsersService, FollowService]
})
export class UsersModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
