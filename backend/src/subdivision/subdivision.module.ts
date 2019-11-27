import { Module } from '@nestjs/common';
import { EntityModule } from '../entity/entity.module';
import { SubdivisionService } from './services/subdivision.service';
import { SubdivisionController } from './subdivision.controller';

@Module({
  imports: [EntityModule],
  controllers: [SubdivisionController],
  providers: [SubdivisionService],
})
export class SubdivisionModule {}
