import { Module } from '@nestjs/common';
import { EntityModule } from 'src/entity/entity.module';
import { FileStorageModule } from 'src/file-storage/file-storage.module';
import { SkillsController } from './skills.controller';
import { SkillsService } from './skills.service';

@Module({
  imports: [EntityModule, FileStorageModule],
  controllers: [SkillsController],
  providers: [SkillsService],
})
export class SkillsModule {}
