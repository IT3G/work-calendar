import { Controller } from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';
import { DictionaryBaseController } from './dictionary-base.controller';
import { ProjectsService } from './services/projects.service';

@ApiUseTags('Projects')
@Controller('projects')
export class ProjectsController extends DictionaryBaseController {
  constructor(private projectsService: ProjectsService) {
    super(projectsService);
  }
}
