import { Controller } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags } from '@nestjs/swagger';
import { EntityToDtoMapperService } from '../shared/services/entity-to-dto-mapper.service';
import { DictionaryBaseController } from './dictionary-base.controller';
import { JobPositionService } from './services/job-position.service';

@ApiBearerAuth()
@ApiUseTags('Project')
@Controller('project')
export class ProjectController extends DictionaryBaseController {
  constructor(jobPositionService: JobPositionService, mapper: EntityToDtoMapperService) {
    super(jobPositionService, mapper);
  }
}
