import { Controller } from '@nestjs/common';
import { ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';
import { DictionaryBaseController } from './dictionary-base.controller';
import { ProjectService } from './services/project.service';

@ApiBearerAuth()
@ApiUseTags('Project')
@Controller('project')
export class ProjectController extends DictionaryBaseController {
  constructor(private projectsService: ProjectService) {
    super(projectsService);
  }
}
