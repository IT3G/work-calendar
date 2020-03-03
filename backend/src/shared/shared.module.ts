import { Module } from '@nestjs/common';
import { CustomMapper } from './services/custom-mapper.service';

@Module({
  providers: [CustomMapper],
  exports: [CustomMapper]
})
export class SharedModule {}
