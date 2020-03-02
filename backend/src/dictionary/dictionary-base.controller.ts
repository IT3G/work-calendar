import { Body, Delete, Get, NotFoundException, Param, Post, Put, Res } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { Document } from 'mongoose';
import { DictionaryDto } from './dto/dictionary.dto';
import { DictionaryBaseService } from './services/dictionary-base.service';

export class DictionaryBaseController {
  constructor(private apiService: DictionaryBaseService) {}

  @Get()
  async getAll(): Promise<DictionaryDto[]> {
    const result = await this.apiService.getAll();

    return result.map(r => this.mapEntityToDto(r));
  }

  @Get('/:id')
  async getById(@Param('id') id): Promise<DictionaryDto> {
    const result = await this.apiService.getById(id);

    if (!result) {
      throw new NotFoundException('Запись не найдена.');
    }

    return this.mapEntityToDto(result);
  }

  @Post()
  async add(@Body() request: DictionaryDto): Promise<DictionaryDto> {
    const result = await this.apiService.add(request);

    if (!result) {
      throw new NotFoundException('Не удалось сохранить');
    }

    return this.mapEntityToDto(result);
  }

  @Put()
  async update(@Body() request: DictionaryDto): Promise<DictionaryDto> {
    const result = await this.apiService.update(request);

    if (!result) {
      throw new NotFoundException('Не удалось обновить');
    }

    return this.mapEntityToDto(result);
  }

  @Delete('/:id')
  async delete(@Res() res, @Param('id') id): Promise<DictionaryDto> {
    const result = await this.apiService.delete(id);

    return this.mapEntityToDto(result);
  }

  private mapEntityToDto(entity: Document): DictionaryDto {
    return plainToClass(DictionaryDto, entity.toObject(), { strategy: 'excludeAll' });
  }
}
