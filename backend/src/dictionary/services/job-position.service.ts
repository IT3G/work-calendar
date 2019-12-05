import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JobPositionEntity } from '../../entity/entities/job-position.entity.model';
import { JobPositionModel } from '../models/job-position.model';
import { DictionaryBaseService } from './dictionary-base.service';

@Injectable()
export class JobPositionService extends DictionaryBaseService<JobPositionEntity, JobPositionModel> {
  constructor(@InjectModel('JobPosition') private readonly jobPositionModel: Model<JobPositionEntity>) {
    super(jobPositionModel);
  }
}
