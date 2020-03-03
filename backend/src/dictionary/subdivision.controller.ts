import { Controller } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags } from '@nestjs/swagger';
import { EntityToDtoMapperService } from '../shared/services/entity-to-dto-mapper.service';
import { DictionaryBaseController } from './dictionary-base.controller';
import { SubdivisionService } from './services/subdivision.service';

@ApiBearerAuth()
@ApiUseTags('Subdivision')
@Controller('subdivision')
export class SubdivisionController extends DictionaryBaseController {
  constructor(subdivisionService: SubdivisionService, mapper: EntityToDtoMapperService) {
    super(subdivisionService, mapper);
  }
}
