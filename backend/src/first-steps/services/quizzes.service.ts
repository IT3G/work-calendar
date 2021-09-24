import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { QuizzesEntity } from '../../entity/entities/quizzes.entity';
import { CreateQuizDto } from '../dto/create-quiz.dto';
import { UpdateQuizDto } from '../dto/update-quiz.dto';

@Injectable()
export class QuizzesService {
  constructor(@InjectModel('Quizzes') private readonly quizzesModel: Model<QuizzesEntity>) {}

  async getAll() {
    return this.quizzesModel.find().exec();
  }

  async getByName(name: string) {
    return this.quizzesModel.findOne({ name }).exec();
  }

  async create(dto: CreateQuizDto) {
    return this.quizzesModel.create(dto);
  }

  async deleteByName(name: string) {
    return this.quizzesModel.findOneAndRemove({ name }).exec();
  }

  async patchByName(name: string, dto: UpdateQuizDto) {
    return this.quizzesModel.findOneAndUpdate({ name }, dto, { new: true }).exec();
  }
}
