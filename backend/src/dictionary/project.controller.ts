import { Controller } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags } from '@nestjs/swagger';
import { EntityToDtoMapperService } from '../shared/services/entity-to-dto-mapper.service';
import { DictionaryBaseController } from './dictionary-base.controller';
import { ProjectService } from './services/project.service';

@ApiBearerAuth()
@ApiUseTags('Project')
@Controller('project')
export class ProjectController extends DictionaryBaseController {
  constructor(projectService: ProjectService, mapper: EntityToDtoMapperService) {
    super(projectService, mapper);
  }
}
