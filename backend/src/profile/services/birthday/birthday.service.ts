import { Injectable } from '@nestjs/common';
import * as moment from 'moment';
import { UserBirthdayDto } from '../../dto/user-birthday.dto';
import { BirthdayRepository } from '../../repositories/birthday.repository';

@Injectable()
export class BirthdayService {
  constructor(private repository: BirthdayRepository) {}

  async getBirthdaysByCurrentMonth(): Promise<UserBirthdayDto[]> {
    const currentMonth = +moment().format('M');

    return await this.repository.findUsersByBirthdayMonthId(currentMonth);
  }

  async findUsersByWeek(): Promise<UserBirthdayDto[]> {
    const currentMonth = +moment().format('M');
    const startOfWeek = +moment().startOf('isoWeek').format('D');
    const endOfWeek = +moment().endOf('isoWeek').format('D');

    return await this.repository.findUsersByWeek(currentMonth, startOfWeek, endOfWeek);
  }

  async getBirthdaysByMonth(monthId: number): Promise<UserBirthdayDto[]> {
    return await this.repository.findUsersByBirthdayMonthId(monthId);
  }

  async findUsersWithEmptyBirthday(): Promise<UserBirthdayDto[]> {
    return await this.repository.findUsersWithEmptyBirthday();
  }
}
