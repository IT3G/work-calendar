import { ApiUseTags } from '@nestjs/swagger';
import { Body, Controller, Delete, Get, HttpStatus, Post, Res } from '@nestjs/common';
import { HolidaysService } from './services/holidays.service';
import { HolidaysResponseModel } from './models/holidays.request.model';

@ApiUseTags('Holidays')
@Controller('holidays')
export class HolidaysController {
  constructor(private holidaysService: HolidaysService) {
  }

  @Get()
  async getAllHolidays(@Res() res) {
    const holidays = await this.holidaysService.getHolidays();
    return res.status(HttpStatus.OK).json(holidays);
  }

  @Get()
  async getHolidaysByDate(@Res() res) {
    const holidays = await this.holidaysService.getHolidays();
    return res.status(HttpStatus.OK).json(holidays);
  }

  @Delete()
  async deleteAllHolidays(@Res() res) {
    const holidays = await this.holidaysService.deleteAllHolidays();
    return res.status(HttpStatus.OK).json(holidays);
  }

  @Post()
  async addHolidays(@Res() res, @Body() holidays: HolidaysResponseModel[]) {
    const newHolidays = await this.holidaysService.addHolidays(holidays);
    return res.status(HttpStatus.OK).json(newHolidays);
  }
}
