import { Module } from '@nestjs/common';
import { EntityModule } from '../entity/entity.module';
import { UsersService } from './services/users.service';
import { UsersController } from './users.controller';

@Module({
  imports: [EntityModule],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
