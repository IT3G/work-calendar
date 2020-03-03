import { Controller } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags } from '@nestjs/swagger';
import { CustomMapper } from '../shared/services/custom-mapper.service';
import { DictionaryBaseController } from './dictionary-base.controller';
import { JobPositionService } from './services/job-position.service';

@ApiBearerAuth()
@ApiUseTags('Job position')
@Controller('jobPosition')
export class JobPositionController extends DictionaryBaseController {
  constructor(jobPositionService: JobPositionService, mapper: CustomMapper) {
    super(jobPositionService, mapper);
  }
}
