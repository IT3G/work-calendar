import { Types } from 'mongoose';
import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { OBJECT_ID_VALIDATION_ERROR } from '../quizzes.constants';

@Injectable()
export class ObjectIdValidationPipe implements PipeTransform {
  transform(value: string, metadata: ArgumentMetadata) {
    if (metadata.type !== 'param') {
      return;
    }

    if (!Types.ObjectId.isValid(value)) {
      throw new BadRequestException(OBJECT_ID_VALIDATION_ERROR);
    }

    return value;
  }
}
