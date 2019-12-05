import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProjectEntity } from '../../entity/entities/projects.entity.model';
import { DictionaryBaseService } from './dictionary-base.service';

@Injectable()
export class ProjectsService extends DictionaryBaseService {
  constructor(@InjectModel('Projects') private readonly projectModel: Model<ProjectEntity>) {
    super(projectModel);
  }
}
