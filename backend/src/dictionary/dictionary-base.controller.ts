import { Body, Delete, Get, HttpStatus, NotFoundException, Param, Post, Put, Res } from '@nestjs/common';
import { DictionaryModel } from './models/dictionary.model';
import { DictionaryBaseService } from './services/dictionary-base.service';

export class DictionaryBaseController {
  constructor(private apiService: DictionaryBaseService) {}

  @Get()
  async getAll(@Res() res) {
    const result = await this.apiService.getAll();
    return res.status(HttpStatus.OK).json(result);
  }

  @Get('/:id')
  async getById(@Res() res, @Param('id') id) {
    const result = await this.apiService.getById(id);

    if (!result) {
      throw new NotFoundException('Запись не найдена.');
    }

    return res.status(HttpStatus.OK).json(result);
  }

  @Post()
  async add(@Res() res, @Body() request: DictionaryModel) {
    const result = await this.apiService.add(request);

    if (!result) {
      throw new NotFoundException('Не удалось сохранить');
    }

    return res.status(HttpStatus.OK).json(result);
  }

  @Put()
  async update(@Res() res, @Body() request: DictionaryModel) {
    const result = await this.apiService.update(request);

    if (!result) {
      throw new NotFoundException('Не удалось обновить');
    }

    return res.status(HttpStatus.OK).json(result);
  }

  @Delete('/:id')
  async delete(@Res() res, @Param('id') id) {
    const result = await this.apiService.delete(id);

    return res.status(HttpStatus.OK).json(result);
  }
}
