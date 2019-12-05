import { Body, Delete, Get, HttpStatus, NotFoundException, Param, Post, Res } from '@nestjs/common';
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
  async add(@Res() res, @Body() data: DictionaryModel) {
    const result = await this.apiService.add(data);

    if (!result) {
      throw new NotFoundException('Не удалось сохранить');
    }

    return res.status(HttpStatus.OK).json(result);
  }

  @Post('/:id')
  async update(@Res() res, @Param('id') id, @Body() data: DictionaryModel) {
    const result = await this.apiService.update(id, data);

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
