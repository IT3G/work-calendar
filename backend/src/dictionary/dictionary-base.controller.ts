import { Body, Delete, Get, HttpStatus, NotFoundException, Param, Post, Res } from '@nestjs/common';
import { Document } from 'mongoose';
import { DictionaryBaseService } from './services/dictionary-base.service';

export class DictionaryBaseController<T extends Document, K, S extends DictionaryBaseService<T, K>> {
  constructor(private apiService: S) {}

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
  async add(@Res() res, @Body() data: K) {
    const result = await this.apiService.add(data);

    if (!result) {
      throw new NotFoundException('Не удалось сохранить');
    }

    return res.status(HttpStatus.OK).json(result);
  }

  @Post('/:id')
  async update(@Res() res, @Param('id') id, @Body() data: K) {
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
