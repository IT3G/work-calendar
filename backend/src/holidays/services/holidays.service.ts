import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { HolidaysEntity } from '../../entity/entities/holidays.entity.model';
import { HolidaysDto } from '../dto/holidays.dto';

@Injectable()
export class HolidaysService {
  constructor(@InjectModel('Holidays') private readonly holidaysModel: Model<HolidaysEntity>) {}

  async getHolidays(): Promise<HolidaysEntity[]> {
    return await this.holidaysModel.find().exec();
  }

  async addHolidays(holidays: HolidaysDto): Promise<HolidaysEntity> {
    const result = await this.holidaysModel.create(holidays);
    return result.save();
  }

  async updateHolidays(holidays: HolidaysDto): Promise<HolidaysEntity> {
    await this.holidaysModel.findByIdAndUpdate(holidays._id, holidays);
    return await this.holidaysModel.findById(holidays._id);
  }
}
