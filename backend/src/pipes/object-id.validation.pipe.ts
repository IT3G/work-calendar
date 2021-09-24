import { Types } from 'mongoose';
import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class ObjectIdValidationPipe implements PipeTransform {
  transform(value: string, metadata: ArgumentMetadata) {
    if (metadata.type !== 'param') {
      return;
    }

    if (!Types.ObjectId.isValid(value)) {
      throw new BadRequestException('Неверный формат id');
    }

    return value;
  }
}
