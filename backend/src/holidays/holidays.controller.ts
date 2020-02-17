import { Body, Controller, Delete, Get, HttpStatus, NotFoundException, Post, Put, Res } from '@nestjs/common';
import { HolidaysService } from './services/holidays.service';
import { HolidaysResponseModel } from './models/holidays.request.model';
import { ApiUseTags } from '@nestjs/swagger';

@ApiUseTags('Holidays')
@Controller('holidays')
export class HolidaysController {
  constructor(private holidaysService: HolidaysService) {}

  @Get()
  async getAllHolidays(@Res() res) {
    const holidays = await this.holidaysService.getHolidays();
    return res.status(HttpStatus.OK).json(holidays);
  }

  @Post()
  async addHolidays(@Res() res, @Body() holidays: HolidaysResponseModel) {
    const result = await this.holidaysService.addHolidays(holidays);

    if (!result) {
      throw new NotFoundException('Не удалось сохранить');
    }

    return res.status(HttpStatus.OK).json(result);
  }

  @Put('')
  async updateHolidays(@Res() res, @Body() holidays: HolidaysResponseModel) {
    const result = await this.holidaysService.updateHolidays(holidays);

    if (!result) {
      throw new NotFoundException('Не удалось обновить');
    }

    return res.status(HttpStatus.OK).json(result);
  }
}
