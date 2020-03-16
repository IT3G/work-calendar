import { Module } from '@nestjs/common';
import { EntityModule } from '../entity/entity.module';
import { FileStorageModule } from '../file-storage/file-storage.module';
import { SettingsController } from './settings.controller';
import { SettingsService } from './settings.service';

@Module({
  imports: [FileStorageModule, EntityModule],
  controllers: [SettingsController],
  providers: [SettingsService]
})
export class SettingsModule {}
