import { Module } from '@nestjs/common';
import { EntityModule } from '../entity/entity.module';
import { ProjectsController } from './projects.controller';
import { ProjectsService } from './services/projects.service';

@Module({
  imports: [EntityModule],
  controllers: [ProjectsController],
  providers: [ProjectsService]
})
export class ProjectsModule {}
