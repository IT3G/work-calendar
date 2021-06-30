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

  async findUsersToday(): Promise<UserBirthdayDto[]> {
    const today = moment();

    return await this.repository.findUsersByPeriod(today, today);
  }

  async findUsersByWeek(): Promise<UserBirthdayDto[]> {
    const startMonth = moment().startOf('isoWeek');
    const endMonth = moment().endOf('isoWeek');

    return await this.repository.findUsersByPeriod(startMonth, endMonth);
  }

  async getBirthdaysByMonth(monthId: number): Promise<UserBirthdayDto[]> {
    return await this.repository.findUsersByBirthdayMonthId(monthId);
  }

  async findUsersWithEmptyBirthday(): Promise<UserBirthdayDto[]> {
    return await this.repository.findUsersWithEmptyBirthday();
  }
}
