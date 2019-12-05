import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProjectEntity } from '../../entity/entities/project.entity.model';
import { DictionaryBaseService } from './dictionary-base.service';

@Injectable()
export class ProjectService extends DictionaryBaseService {
  constructor(@InjectModel('Project') private readonly projectModel: Model<ProjectEntity>) {
    super(projectModel);
  }
}
