import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { QuizEntity } from '../entity/entities/quiz.entity';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';

@Injectable()
export class QuizzesService {
  constructor(@InjectModel('Quizzes') private readonly followModel: Model<QuizEntity>) {}

  async create(dto: CreateQuizDto): Promise<QuizEntity> {
    return this.followModel.create(dto);
  }

  async get(): Promise<QuizEntity[]> {
    return this.followModel.find();
  }

  async update(id: string, dto: UpdateQuizDto): Promise<QuizEntity | null> {
    return this.followModel.findByIdAndUpdate(id, dto, { new: true });
  }

  async delete(id: string): Promise<QuizEntity | null> {
    return this.followModel.findByIdAndDelete(id);
  }

  async findById(id: string): Promise<QuizEntity | null> {
    return this.followModel.findById(id);
  }

  async findByName(name: string): Promise<QuizEntity | null> {
    return this.followModel.findOne({ name });
  }
}
