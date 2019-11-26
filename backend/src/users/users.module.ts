import { Module } from '@nestjs/common';
import { EntityModule } from '../entity/entity.module';
import { JobPositionController } from './job-position.controller';
import { JobPositionService } from './services/job-position.service';
import { UsersService } from './services/users.service';
import { UsersController } from './users.controller';

@Module({
  imports: [EntityModule],
  controllers: [UsersController, JobPositionController],
  providers: [UsersService, JobPositionService],
  exports: [UsersService, JobPositionService],
})
export class UsersModule {}
