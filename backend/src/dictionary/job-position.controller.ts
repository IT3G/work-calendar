import { Controller } from '@nestjs/common';
import { ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';
import { DictionaryBaseController } from './dictionary-base.controller';
import { JobPositionService } from './services/job-position.service';

@ApiBearerAuth()
@ApiUseTags('Job position')
@Controller('jobPosition')
export class JobPositionController extends DictionaryBaseController {
  constructor(private jobPositionService: JobPositionService) {
    super(jobPositionService);
  }
}
