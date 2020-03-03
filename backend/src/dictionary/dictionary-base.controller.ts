import { Body, Delete, Get, NotFoundException, Param, Post, Put } from '@nestjs/common';
import { EntityToDtoMapperService } from '../shared/services/entity-to-dto-mapper.service';
import { DictionaryDto } from './dto/dictionary.dto';
import { DictionaryBaseService } from './services/dictionary-base.service';

export class DictionaryBaseController {
  constructor(private apiService: DictionaryBaseService, private mapper: EntityToDtoMapperService) {}

  @Get()
  async getAll(): Promise<DictionaryDto[]> {
    const result = await this.apiService.getAll();

    return this.mapper.mapArray(DictionaryDto, result);
  }

  @Get('/:id')
  async getById(@Param('id') id): Promise<DictionaryDto> {
    const result = await this.apiService.getById(id);

    if (!result) {
      throw new NotFoundException('Запись не найдена.');
    }

    return this.mapper.map(DictionaryDto, result);
  }

  @Post()
  async add(@Body() request: DictionaryDto): Promise<DictionaryDto> {
    const result = await this.apiService.add(request);

    if (!result) {
      throw new NotFoundException('Не удалось сохранить');
    }

    return this.mapper.map(DictionaryDto, result);
  }

  @Put()
  async update(@Body() request: DictionaryDto): Promise<DictionaryDto> {
    const result = await this.apiService.update(request);

    if (!result) {
      throw new NotFoundException('Не удалось обновить');
    }

    return this.mapper.map(DictionaryDto, result);
  }

  @Delete('/:id')
  async delete(@Param('id') id): Promise<DictionaryDto> {
    const result = await this.apiService.delete(id);

    return this.mapper.map(DictionaryDto, result);
  }
}
