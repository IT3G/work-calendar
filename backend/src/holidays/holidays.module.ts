import { Module } from '@nestjs/common';
import { EntityModule } from '../entity/entity.module';
import { SharedModule } from '../shared/shared.module';
import { HolidaysController } from './holidays.controller';
import { HolidaysService } from './services/holidays.service';

@Module({
  imports: [EntityModule, SharedModule],
  controllers: [HolidaysController],
  providers: [HolidaysService]
})
export class HolidaysModule {}
