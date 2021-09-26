import { Module } from '@nestjs/common';
import { QuizzesController } from './controllers/quizzes.controller';
import { UserQuizzesController } from './controllers/user-quizzes.controller';
import { QuizzesService } from './services/quizzes.service';
import { UserQuizzesService } from './services/user-quizzes.service';
import { EntityModule } from '../entity/entity.module';
import { SharedModule } from '../shared/shared.module';
import { WorkCalendarModule } from '../work-calendar/work-calendar.module';

@Module({
  imports: [EntityModule, SharedModule, WorkCalendarModule],
  controllers: [QuizzesController, UserQuizzesController],
  providers: [QuizzesService, UserQuizzesService]
})
export class FirstStepsModule {}
