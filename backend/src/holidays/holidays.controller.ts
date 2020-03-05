import { Body, Controller, Get, NotFoundException, Post, Put } from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';
import { CustomMapper } from '../shared/services/custom-mapper.service';
import { HolidaysDto } from './dto/holidays.dto';
import { HolidaysService } from './services/holidays.service';

@ApiUseTags('Holidays')
@Controller('holidays')
export class HolidaysController {
  constructor(private holidaysService: HolidaysService, private mapper: CustomMapper) {}

  @Get()
  async getAllHolidays(): Promise<HolidaysDto[]> {
    const holidays = await this.holidaysService.getHolidays();

    return this.mapper.mapArray(HolidaysDto, holidays);
  }

  @Post()
  async addHolidays(@Body() holidays: HolidaysDto): Promise<HolidaysDto> {
    const result = await this.holidaysService.addHolidays(holidays);

    if (!result) {
      throw new NotFoundException('Не удалось сохранить');
    }

    return this.mapper.map(HolidaysDto, result);
  }

  @Put('')
  async updateHolidays(@Body() holidays: HolidaysDto): Promise<HolidaysDto> {
    const result = await this.holidaysService.updateHolidays(holidays);

    if (!result) {
      throw new NotFoundException('Не удалось обновить');
    }

    return this.mapper.map(HolidaysDto, result);
  }
}
