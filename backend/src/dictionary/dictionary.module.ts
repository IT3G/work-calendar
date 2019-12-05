import { Module } from '@nestjs/common';
import { EntityModule } from '../entity/entity.module';
import { JobPositionController } from './job-position.controller';
import { ProjectsController } from './projects.controller';
import { JobPositionService } from './services/job-position.service';
import { ProjectsService } from './services/projects.service';
import { SubdivisionService } from './services/subdivision.service';
import { SubdivisionController } from './subdivision.controller';

@Module({
  imports: [EntityModule],
  controllers: [JobPositionController, ProjectsController, SubdivisionController],
  providers: [JobPositionService, ProjectsService, SubdivisionService],
  exports: [JobPositionService]
})
export class DictionaryModule {}
