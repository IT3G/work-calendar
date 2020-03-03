import { Controller } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags } from '@nestjs/swagger';
import { CustomMapper } from '../shared/services/custom-mapper.service';
import { DictionaryBaseController } from './dictionary-base.controller';
import { SubdivisionService } from './services/subdivision.service';

@ApiBearerAuth()
@ApiUseTags('Subdivision')
@Controller('subdivision')
export class SubdivisionController extends DictionaryBaseController {
  constructor(subdivisionService: SubdivisionService, mapper: CustomMapper) {
    super(subdivisionService, mapper);
  }
}
