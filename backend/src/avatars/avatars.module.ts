import { HttpModule, Module } from '@nestjs/common';
import { Config, getConfig } from '../config/config';
import { AvatarsController } from './avatars.controller';
import { ConfluenceAvatarService } from './confluence-avatars.service';

@Module({
  imports: [HttpModule, Config],
  controllers: [AvatarsController],
  providers: [ConfluenceAvatarService, { provide: Config, useValue: getConfig() }]
})
export class AvatarsModule {}
