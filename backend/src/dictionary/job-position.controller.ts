import { Controller } from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';
import { DictionaryBaseController } from './dictionary-base.controller';
import { JobPositionService } from './services/job-position.service';

@ApiUseTags('Job position')
@Controller('jobPosition')
export class JobPositionController extends DictionaryBaseController {
  constructor(private jobPositionService: JobPositionService) {
    super(jobPositionService);
  }
}
