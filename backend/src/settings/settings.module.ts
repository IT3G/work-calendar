import { Module } from '@nestjs/common';
import { SettingsController } from './settings.controller';

@Module({
  controllers: [SettingsController]
})
export class SettingsModule {}
