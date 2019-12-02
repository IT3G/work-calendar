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
      .sort({ name: 'asc' })
      .exec();
  }

  async getByName(name: string): Promise<SubdivisionModel[]> {
    return await this.subdivisionModel.find({ name }).exec();
  }

  async getById(id: string): Promise<SubdivisionModel> {
    return await this.subdivisionModel.findById(id).exec();
  }

  async addSubdivision(subdivisionResp: SubdivisionModel): Promise<SubdivisionModel> {
    const subdivision = await this.subdivisionModel.create(subdivisionResp);
    return await subdivision.save();
  }

  async updateSD(id: number, data: SubdivisionModel): Promise<SubdivisionModel> {
    await this.subdivisionModel.findByIdAndUpdate(id, data);
    return await this.subdivisionModel.findById(id);
  }

  async delete(id: number): Promise<SubdivisionModel> {
    return await this.subdivisionModel.findByIdAndDelete(id);
  }
}
