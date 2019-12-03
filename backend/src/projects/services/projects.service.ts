import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProjectEntity } from '../../entity/entities/projects.entity.model';
import { ProjectModel } from '../models/projects.request.model';

@Injectable()
export class ProjectsService {
  constructor(@InjectModel('Projects') private readonly projectModel: Model<ProjectEntity>) {}

  async getProjects(): Promise<ProjectModel[]> {
    return await this.projectModel.find().exec();
  }

  async addProject(project: ProjectModel): Promise<ProjectModel> {
    const newProject = await this.projectModel.create(project);
    return newProject.save();
  }
}
