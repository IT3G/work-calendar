import { ApiUseTags } from '@nestjs/swagger';
import { Body, Controller, Get, HttpStatus, Post, Res } from '@nestjs/common';
import { HolidaysService } from './services/holidays.service';
import { HolidaysResponseModel } from './models/holidays.request.model';

@ApiUseTags('Holidays')
@Controller('holidays')
export class HolidaysController {
  constructor(private holidaysService: HolidaysService) {
  }

  @Get()
  async getHolidays(@Res() res) {
    const holidays = await this.holidaysService.getHolidays();
    return res.status(HttpStatus.OK).json(holidays);
  }

  @Post()
  async addHolidays(@Res() res, @Body() holidays: HolidaysResponseModel) {
    const newHolidays = await this.holidaysService.addHolidays(holidays);
    return res.status(HttpStatus.OK).json(newHolidays);
  }
}
