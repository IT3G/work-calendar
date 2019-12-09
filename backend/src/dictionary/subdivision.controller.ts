import { Controller } from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';
import { DictionaryBaseController } from './dictionary-base.controller';
import { SubdivisionService } from './services/subdivision.service';

@ApiUseTags('Subdivision')
@Controller('subdivision')
export class SubdivisionController extends DictionaryBaseController {
  constructor(private subdivisionService: SubdivisionService) {
    super(subdivisionService);
  }
}
