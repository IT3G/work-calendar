import { Body, Controller, Delete, Get, HttpStatus, NotFoundException, Param, Post, Res } from '@nestjs/common';
import { SubdivisionModel } from './models/subdivision.responce.model';
import { SubdivisionService } from './services/subdivision.service';
import { ApiUseTags } from '@nestjs/swagger';

@ApiUseTags('Subdivision')
@Controller('subdivision')
export class SubdivisionController {
  constructor(private subdivisionService: SubdivisionService) {
  }

  @Get()
  async getUsers(@Res() res) {
    const posts = await this.subdivisionService.getSubdivisions();
    return res.status(HttpStatus.OK).json(posts);
  }

  @Get('/:id')
  async getById(@Res() res, @Param('id') id) {
    const subdivision = await this.subdivisionService.getById(id);

    if (!subdivision) {
      throw new NotFoundException('subdivision does not exist!');
    }

    return res.status(HttpStatus.OK).json(subdivision);
  }

  @Post()
  async addSubdivision(@Res() res, @Body() data: SubdivisionModel) {
    const subdivision = await this.subdivisionService.addSubdivision(data);
    if (!subdivision) {
      throw new NotFoundException('subdivision not exist!');
    }

    return res.status(HttpStatus.OK).json(subdivision);
  }

  @Post('/:id')
  async updateSD(@Res() res, @Param('id') id, @Body() data: SubdivisionModel) {
    const subdivision = await this.subdivisionService.updateSD(id, data);
    if (!subdivision) {
      throw new NotFoundException('subdivision not exist!');
    }

    return res.status(HttpStatus.OK).json(subdivision);
  }

  @Delete('/:id')
  async deleteJobPosition(@Res() res, @Param('id') id) {
    const subdivision = await this.subdivisionService.delete(id);

    return res.status(HttpStatus.OK).json(subdivision);
  }

}
