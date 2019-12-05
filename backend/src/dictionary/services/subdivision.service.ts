import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SubdivisionEntity } from '../../entity/entities/subdivision.entity.model';
import { SubdivisionModel } from '../models/subdivision.model';
import { DictionaryBaseService } from './dictionary-base.service';

@Injectable()
export class SubdivisionService extends DictionaryBaseService<SubdivisionEntity, SubdivisionModel> {
  constructor(@InjectModel('Subdivision') private readonly subdivisionModel: Model<SubdivisionEntity>) {
    super(subdivisionModel);
  }
}
