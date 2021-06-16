import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as moment from 'moment';
import { Model } from 'mongoose';
import { UserEntity } from '../../entity/entities/user.entity';
import { UserBirthdayDto } from '../dto/user-birthday.dto';
import { BirthdayRepository } from '../repositories/birthday.repository';

@Injectable()
export class BirthdayService {
  constructor(private repository: BirthdayRepository) {}

  public async getBirthdaysByCurrentMonth(): Promise<UserBirthdayDto[]> {
    const currentMonth = +moment().format('M');

    return await this.repository.findUsersByBirthdayMonthId(currentMonth);
  }

  public async getBirthdaysByMonth(monthId: number): Promise<UserBirthdayDto[]> {
    return await this.repository.findUsersByBirthdayMonthId(monthId);
  }
}
