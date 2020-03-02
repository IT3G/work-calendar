import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { ClassType } from 'class-transformer/ClassTransformer';
import { Document } from 'mongoose';

@Injectable()
export class EntityToDtoMapperService {
  map<T>(clazz: ClassType<T>, entity: Document): T {
    return plainToClass(clazz, entity.toObject(), { strategy: 'excludeAll' });
  }

  mapArray<T>(clazz: ClassType<T>, entities: Document[]): T[] {
    return entities.map(e => this.map(clazz, e));
  }
}
