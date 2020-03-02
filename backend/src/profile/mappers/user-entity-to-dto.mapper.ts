import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { UserEntity } from '../../entity/entities/user.entity';
import { UserDto } from '../dto/user.dto';

@Injectable()
export class UserEntityToDtoMapper {
  map(entity: UserEntity): UserDto {
    return plainToClass(UserDto, entity.toObject(), { strategy: 'excludeAll' });
  }

  mapArray(entities: UserEntity[]): UserDto[] {
    return entities.map(e => this.map(e));
  }
}
