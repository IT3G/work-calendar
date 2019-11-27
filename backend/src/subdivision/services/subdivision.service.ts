import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SubdivisionModel } from '../models/subdivision.responce.model';
import { SubdivisionEntity } from '../../entity/entities/subdivision.entity.model';

@Injectable()
export class SubdivisionService {
  constructor(@InjectModel('Subdivision') private readonly subdivisionModel: Model<SubdivisionEntity>) {
  }

  async getSubdivisions(): Promise<SubdivisionModel[]> {
    return await this.subdivisionModel
      .find()
      .exec();
  }

  async addSubdivision(subdivisionResp: SubdivisionModel): Promise<SubdivisionModel> {
    const subdivision = await this.subdivisionModel.create(subdivisionResp);
    return subdivision.save();
  }

}
