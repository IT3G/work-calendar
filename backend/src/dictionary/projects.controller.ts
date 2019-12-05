import { Controller } from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';
import { ProjectEntity } from '../entity/entities/projects.entity.model';
import { DictionaryBaseController } from './dictionary-base.controller';
import { ProjectModel } from './models/projects.model';
import { ProjectsService } from './services/projects.service';

@ApiUseTags('Projects')
@Controller('projects')
export class ProjectsController extends DictionaryBaseController<ProjectEntity, ProjectModel, ProjectsService> {
  constructor(private projectsService: ProjectsService) {
    super(projectsService);
  }
}
