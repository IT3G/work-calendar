import { Controller } from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';
import { JobPositionEntity } from '../entity/entities/job-position.entity.model';
import { DictionaryBaseController } from './dictionary-base.controller';
import { JobPositionModel } from './models/job-position.model';
import { JobPositionService } from './services/job-position.service';

@ApiUseTags('Job position')
@Controller('jobPosition')
export class JobPositionController extends DictionaryBaseController<
  JobPositionEntity,
  JobPositionModel,
  JobPositionService
> {
  constructor(private jobPositionService: JobPositionService) {
    super(jobPositionService);
  }
}
