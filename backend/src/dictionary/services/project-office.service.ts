import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProjectOfficeEntity } from '../../entity/entities/project-office.entity.model';
import { DictionaryBaseService } from './dictionary-base.service';

@Injectable()
export class ProjectOfficeService extends DictionaryBaseService {
  constructor(@InjectModel('ProjectOffice') private readonly projectOfficeModel: Model<ProjectOfficeEntity>) {
    super(projectOfficeModel);
  }
}
