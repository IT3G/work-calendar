import { Controller, Get, Header, NotFoundException, Param, Res } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags } from '@nestjs/swagger';
import { CustomMapper } from '../../shared/services/custom-mapper.service';
import { UserBirthdayDto } from '../dto/user-birthday.dto';
import { BirthdayImgService } from '../services/birthday/birthday-img.service';
import { BirthdayService } from '../services/birthday/birthday.service';

@ApiBearerAuth()
@ApiUseTags('Birthday')
@Controller('birthday')
export class BirthdayController {
  constructor(
    private birthdayService: BirthdayService,
    private birthdayImgService: BirthdayImgService,
    private mapper: CustomMapper
  ) {}

  @Get('/current')
  async getBirthdaysByCurrentMonth(): Promise<UserBirthdayDto[]> {
    const users = await this.birthdayService.getBirthdaysByCurrentMonth();

    return this.mapper.mapArray(UserBirthdayDto, users);
  }

  @Get('/current/img')
  @Header('Content-disposition', 'inline')
  async getBirthdaysByCurrentMonthImg(@Res() res) {
    try {
      const img = await this.birthdayImgService.getCurrentMonthImg();
      res.set('Content-Type', 'image/png');
      res.send(img);
      res.end();
    } catch (err) {
      res.sendStatus(404);
    }
  }

  @Get('/empty')
  async findUsersWithEmptyBirthday(): Promise<UserBirthdayDto[]> {
    const users = await this.birthdayService.findUsersWithEmptyBirthday();

    return this.mapper.mapArray(UserBirthdayDto, users);
  }

  @Get(':id')
  async getBirthdaysByMonth(@Param('id') id): Promise<UserBirthdayDto[]> {
    if (id < 1 || id > 12) {
      throw new NotFoundException('Месяц должен быть от 1 до 12');
    }

    const users = await this.birthdayService.getBirthdaysByMonth(id);

    return this.mapper.mapArray(UserBirthdayDto, users);
  }
}
