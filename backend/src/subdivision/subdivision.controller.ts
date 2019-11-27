import { Body, Controller, Delete, Get, HttpStatus, NotFoundException, Param, Post, Res } from '@nestjs/common';
import { SubdivisionModel } from './models/subdivision.responce.model';
import { SubdivisionService } from './services/subdivision.service';
import { ApiUseTags } from '@nestjs/swagger';

@ApiUseTags('Subdivisions')
@Controller('subdivisions')
export class SubdivisionController {
  constructor(private subdivisionService: SubdivisionService) {}

  @Get()
  async getSubdivisions(@Res() res) {
    const subdivisions = await this.subdivisionService.getSubdivisions();
    return res.status(HttpStatus.OK).json(subdivisions);
  }

  @Post('/add')
  async addSubdivision(@Res() res, @Body() data: SubdivisionModel) {
    const subdivision = await this.subdivisionService.addSubdivision(data);
    if (!subdivision) {
      throw new NotFoundException('Subdivision exist!');
    }

    return res.status(HttpStatus.OK).json(subdivision);
  }

}
