import { Body, Controller, Get, HttpStatus, Post, Res } from '@nestjs/common';
import { ProjectModel } from './models/projects.request.model';
import { ProjectsService } from './services/projects.service';

@Controller('projects')
export class ProjectsController {
  constructor(private projectsService: ProjectsService) {}

  @Get()
  async getProjects(@Res() res) {
    const posts = await this.projectsService.getProjects();
    return res.status(HttpStatus.OK).json(posts);
  }

  @Post('/add')
  async addProject(@Res() res, @Body() data: ProjectModel) {
    const newProject = await this.projectsService.addProject(data);
    return res.status(HttpStatus.OK).json(newProject);
  }
}
