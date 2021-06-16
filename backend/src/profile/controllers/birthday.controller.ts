import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags } from '@nestjs/swagger';
import { UserEntity } from '../../entity/entities/user.entity';
import { CustomMapper } from '../../shared/services/custom-mapper.service';
import { UserBirthdayDto } from '../dto/user-birthday.dto';
import { UserDto } from '../dto/user.dto';
import { BirthdayService } from '../services/birthday.service';

@ApiBearerAuth()
@ApiUseTags('Birthday')
@Controller('birthday')
export class BirthdayController {
  constructor(private birthdayService: BirthdayService, private mapper: CustomMapper) {}

  @Get('/current')
  async getBirthdaysByCurrentMonth(): Promise<UserBirthdayDto[]> {
    const users = await this.birthdayService.getBirthdaysByCurrentMonth();

    return this.mapper.mapArray(UserBirthdayDto, users);
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
