import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { ClassType } from 'class-transformer/ClassTransformer';

@Injectable()
export class CustomMapper {
  map<TOut, TIn>(clazz: ClassType<TOut>, entity: TIn): TOut {
    return plainToClass(clazz, entity, { excludeExtraneousValues: true });
  }

  mapArray<TOut, TIn>(clazz: ClassType<TOut>, entities: TIn[]): TOut[] {
    return entities.map(e => this.map(clazz, e));
  }
}
