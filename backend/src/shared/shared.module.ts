import { Module } from '@nestjs/common';
import { CustomMapper } from './services/custom-mapper.service';
import { DateFormatter } from './services/date-formatter.service';

@Module({
  providers: [CustomMapper, DateFormatter],
  exports: [CustomMapper, DateFormatter]
})
export class SharedModule {}
