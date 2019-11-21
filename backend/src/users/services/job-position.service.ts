import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JobPositionModel } from '../../auth/models/job-position.response.model';
import { JobPositionEntity } from '../../entity/entities/job-position.entity.model';

@Injectable()
export class JobPositionService {
  constructor(@InjectModel('JobPosition') private readonly jobPositionModel: Model<JobPositionEntity>) {}

  async getJobPositions(): Promise<JobPositionModel[]> {
    const jobPositions = await this.jobPositionModel
      .find()
      .sort({ name: 'asc' })
      .exec();
    return jobPositions;
  }

  async getByName(name: string): Promise<JobPositionModel[]> {
    const jobPosition = await this.jobPositionModel.find({ name }).exec();
    return jobPosition;
  }

  async getById(id: string): Promise<JobPositionModel> {
    const jobPosition = await this.jobPositionModel.findById(id).exec();
    return jobPosition;
  }

  async addJobPosition(jobPositionResp: JobPositionModel): Promise<JobPositionModel> {
    const jobPosition = await this.jobPositionModel.create(jobPositionResp);
    return jobPosition.save();
  }

  async updateJobPosition(id: string, data: JobPositionModel): Promise<JobPositionModel> {
    const result = await this.jobPositionModel.updateOne({ name: data.name }, { ...data });
    return result;
  }
}
