import { Module } from '@nestjs/common';
import { QuizzesController } from './quizzes.controller';
import { QuizzesService } from './quizzes.service';
import { EntityModule } from '../entity/entity.module';
import { SharedModule } from '../shared/shared.module';

@Module({
  imports: [EntityModule, SharedModule],
  controllers: [QuizzesController],
  providers: [QuizzesService]
})
export class QuizzesModule {}
