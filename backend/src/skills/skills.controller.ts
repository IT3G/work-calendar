import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { SkillsEntity } from 'src/entity/entities/skills.entity.model';
import { SkillsDto } from './dto/skills.dto';
import { SkillsService } from './skills.service';

const encodeUrl = require('encodeurl');

@Controller('skills')
export class SkillsController {
  constructor(private skillsService: SkillsService) {}

  @Get(':id')
  getSkillById(@Param('id') id: string): Promise<SkillsEntity> {
    return this.skillsService.getOneSkill(id);
  }

  @Get()
  getSkills(): Promise<SkillsEntity[]> {
    return this.skillsService.getSkills();
  }

  @Get('/logo/:name')
  async getLogo(@Res() res: Response, @Param('name') name: string) {
    const logo = await this.skillsService.getLogo(name);

    res
      .set('content-disposition', `attachment; filename="${encodeUrl(name)}"`)
      .status(HttpStatus.OK)
      .send(logo);
  }

  @Post()
  createSkill(@Body() skill: Partial<SkillsDto>): Promise<SkillsEntity> {
    return this.skillsService.createSkill(skill);
  }

  @Put(':id')
  updateSkill(@Param('id') id: string, @Body() skill: Partial<SkillsDto>): Promise<SkillsEntity> {
    return this.skillsService.updateSkill(id, skill);
  }

  @Post('/logo')
  @UseInterceptors(FileInterceptor('file'))
  async uploadLogo(@UploadedFile() file): Promise<void> {
    await this.skillsService.saveLogo(file);
    return;
  }

  @Delete('logo/:name')
  deleteLogo(@Param('name') name: string): Promise<void> {
    return this.skillsService.deleteLogo(name);
  }

  @Delete(':id')
  deleteSkill(@Param('id') id: string): Promise<void> {
    return this.skillsService.deleteSkill(id);
  }
}
