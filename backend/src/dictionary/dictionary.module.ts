import { Module } from '@nestjs/common';
import { EntityModule } from '../entity/entity.module';
import { SharedModule } from '../shared/shared.module';
import { JobPositionController } from './job-position.controller';
import { ProjectOfficeController } from './project-office.controller';
import { ProjectController } from './project.controller';
import { JobPositionService } from './services/job-position.service';
import { ProjectOfficeService } from './services/project-office.service';
import { ProjectService } from './services/project.service';
import { SubdivisionService } from './services/subdivision.service';
import { SubdivisionController } from './subdivision.controller';

@Module({
  imports: [EntityModule, SharedModule],
  controllers: [JobPositionController, ProjectController, SubdivisionController, ProjectOfficeController],
  providers: [JobPositionService, ProjectService, SubdivisionService, ProjectOfficeService],
  exports: [JobPositionService, ProjectOfficeService],
})
export class DictionaryModule {}
