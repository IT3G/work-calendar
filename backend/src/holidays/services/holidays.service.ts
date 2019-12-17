import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { HolidaysEntity } from '../../entity/entities/holidays.entity.model';
import { HolidaysResponseModel } from '../models/holidays.request.model';

@Injectable()
export class HolidaysService {
  constructor(@InjectModel('Holidays') private readonly holidaysModel: Model<HolidaysEntity>) {
  }

  async getHolidays(): Promise<HolidaysResponseModel[]> {
    return await this.holidaysModel.find().exec();
  }

  async deleteAllHolidays(): Promise<HolidaysResponseModel[]> {
    return this.holidaysModel.find().remove();
  }

  async addHolidays(holidays: HolidaysResponseModel[]): Promise<HolidaysEntity[]> {

    return this.holidaysModel.insertMany(holidays);
    return newHolidays.save();
  }
}
