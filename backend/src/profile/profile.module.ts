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
  imports: [EntityModule, HttpModule],
  controllers: [UsersController, AvatarsController, FollowController],
  providers: [UsersService, FollowService, avatarServiceProvider, { provide: Config, useValue: config }],
  exports: [UsersService, FollowService]
})
export class ProfileModule {}
