import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Document, Model } from 'mongoose';
import { HolidaysEntity } from '../../entity/entities/holidays.entity.model';
import { HolidaysResponseModel } from '../models/holidays.request.model';
import { DictionaryModel } from '../../dictionary/models/dictionary.model';

@Injectable()
export class HolidaysService {
  constructor(@InjectModel('Holidays') private readonly holidaysModel: Model<HolidaysEntity>) {
  }

  async getHolidays(): Promise<HolidaysEntity[]> {
    return await this.holidaysModel.find().exec();
  }

  async upsertHolidays(holidays: HolidaysResponseModel): Promise<Document> {
    if (holidays._id) {
      await this.holidaysModel.findByIdAndUpdate(holidays._id, holidays);
      return await this.holidaysModel.findById(holidays._id);
    }

    const result = await this.holidaysModel.create(holidays);
    return result.save();
  }
}
