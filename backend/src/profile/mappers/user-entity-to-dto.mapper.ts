import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { UserEntity } from '../../entity/entities/user.entity';
import { UserModel } from '../models/user.model';

@Injectable()
export class UserEntityToDtoMapper {
  map(entity: UserEntity): UserModel {
    return plainToClass(UserModel, entity.toObject(), { strategy: 'excludeAll' });
  }
}
