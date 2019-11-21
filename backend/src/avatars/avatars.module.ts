import { HttpModule, HttpService, Module } from '@nestjs/common';
import { Config, getConfig } from '../config/config';
import { AvatarsController } from './avatars.controller';
import { AvatarsService } from './avatars.service';
import { ConfluenceAvatarService } from './confluence-avatars.service';
import { DefaultAvatarsService } from './default-avatars.service';

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
  imports: [HttpModule, Config],
  controllers: [AvatarsController],
  providers: [avatarServiceProvider, { provide: Config, useValue: getConfig() }]
})
export class AvatarsModule {}
