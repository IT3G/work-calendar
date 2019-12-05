import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProjectEntity } from '../../entity/entities/projects.entity.model';
import { ProjectModel } from '../models/projects.model';
import { DictionaryBaseService } from './dictionary-base.service';

@Injectable()
export class ProjectsService extends DictionaryBaseService<ProjectEntity, ProjectModel> {
  constructor(@InjectModel('Projects') private readonly projectModel: Model<ProjectEntity>) {
    super(projectModel);
  }
}
