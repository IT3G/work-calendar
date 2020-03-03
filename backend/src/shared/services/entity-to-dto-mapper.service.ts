import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { ClassType } from 'class-transformer/ClassTransformer';

@Injectable()
export class EntityToDtoMapperService {
  map<T>(clazz: ClassType<T>, entity: any): T {
    return plainToClass(clazz, entity, { excludeExtraneousValues: true });
  }

  mapArray<T>(clazz: ClassType<T>, entities: any[]): T[] {
    return entities.map(e => this.map(clazz, e));
  }
}
