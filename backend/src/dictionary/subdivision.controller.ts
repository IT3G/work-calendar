import { Controller } from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';
import { SubdivisionEntity } from '../entity/entities/subdivision.entity.model';
import { DictionaryBaseController } from './dictionary-base.controller';
import { SubdivisionModel } from './models/subdivision.model';
import { SubdivisionService } from './services/subdivision.service';

@ApiUseTags('Subdivision')
@Controller('subdivision')
export class SubdivisionController extends DictionaryBaseController<
  SubdivisionEntity,
  SubdivisionModel,
  SubdivisionService
> {
  constructor(private subdivisionService: SubdivisionService) {
    super(subdivisionService);
  }
}
