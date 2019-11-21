import { Body, Controller, Get, HttpStatus, NotFoundException, Param, Post, Res } from '@nestjs/common';
import { JobPositionModel } from '../auth/models/job-position.response.model';
import { JobPositionService } from './services/job-position.service';

@Controller('jobPosition')
export class JobPositionController {
  constructor(private jobPositionService: JobPositionService) {}

  @Get()
  async getUsers(@Res() res) {
    const posts = await this.jobPositionService.getJobPositions();
    return res.status(HttpStatus.OK).json(posts);
  }

  @Get('/:id')
  async getById(@Res() res, @Param('id') id) {
    const position = await this.jobPositionService.getById(id);

    if (!position) {
      throw new NotFoundException('Job position does not exist!');
    }

    return res.status(HttpStatus.OK).json(position);
  }

  @Post()
  async addJobPosition(@Res() res, @Body() data: JobPositionModel) {
    const jobPosition = await this.jobPositionService.addJobPosition(data);
    if (!jobPosition) {
      throw new NotFoundException('Job position not exist!');
    }

    return res.status(HttpStatus.OK).json(jobPosition);
  }

  @Post('/:id')
  async updateJobPosition(@Res() res, @Param('id') id, @Body() data: JobPositionModel) {
    const jobPosition = await this.jobPositionService.updateJobPosition(id, data);
    if (!jobPosition) {
      throw new NotFoundException('Job position not exist!');
    }

    return res.status(HttpStatus.OK).json(jobPosition);
  }
}
