import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProjectModel } from '../models/projects.request.model';

@Injectable()
export class ProjectsService {
  constructor(@InjectModel('Projects') private readonly projectModel: Model<ProjectModel>) {}

  async getProjects(): Promise<ProjectModel[]> {
    const projects = await this.projectModel.find().exec();
    return projects;
  }

  async addProject(project: ProjectModel): Promise<ProjectModel> {
    const newProject = await this.projectModel(project);
    return newProject.save();
  }
}
