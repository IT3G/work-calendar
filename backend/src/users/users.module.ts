import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersService } from './services/users.service';
import { UsersController } from './users.controller';
import { JobPositionController } from './job-position.controller.ts';
import { JobPositionService } from './services/job-position.service';

@Module({
  controllers: [UsersController, JobPositionController],
  providers: [UsersService, JobPositionService],
  exports: [UsersService, JobPositionService]
})
export class UsersModule {}
