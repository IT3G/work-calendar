import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Document, Model } from 'mongoose';
import { HolidaysEntity } from '../../entity/entities/holidays.entity.model';
import { HolidaysResponseModel } from '../models/holidays.request.model';
import { DictionaryModel } from '../../dictionary/models/dictionary.model';

@Injectable()
export class HolidaysService {
  constructor(@InjectModel('Holidays') private readonly holidaysModel: Model<HolidaysEntity>) {}

  async getHolidays(): Promise<HolidaysEntity[]> {
    return await this.holidaysModel.find().exec();
  }

  async addHolidays(holidays: HolidaysResponseModel): Promise<Document> {
    const result = await this.holidaysModel.create(holidays);
    return result.save();
  }

  async updateHolidays(holidays: HolidaysResponseModel): Promise<Document> {
    await this.holidaysModel.findByIdAndUpdate(holidays._id, holidays);
    return await this.holidaysModel.findById(holidays._id);
  }
}
