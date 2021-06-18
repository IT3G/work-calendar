import { Controller } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags } from '@nestjs/swagger';
import { CustomMapper } from '../shared/services/custom-mapper.service';
import { DictionaryBaseController } from './dictionary-base.controller';
import { ProjectOfficeService } from './services/project-office.service';

@ApiBearerAuth()
@ApiUseTags('Project office')
@Controller('projectOffice')
export class ProjectOfficeController extends DictionaryBaseController {
  constructor(projectOffiveService: ProjectOfficeService, mapper: CustomMapper) {
    super(projectOffiveService, mapper);
  }
}
