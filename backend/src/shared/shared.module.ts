import { Module } from '@nestjs/common';
import { EntityToDtoMapperService } from './services/entity-to-dto-mapper.service';

@Module({
  providers: [EntityToDtoMapperService],
  exports: [EntityToDtoMapperService]
})
export class SharedModule {}
