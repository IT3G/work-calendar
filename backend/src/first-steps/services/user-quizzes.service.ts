import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { QuizzesService } from './quizzes.service';
import { CreateAnswerDto } from '../dto/create-answer.dto';
import { USER_QUIZ_ALREADY_EXIST_ERROR, USER_QUIZ_NOT_EXIST_ERROR } from '../constants/user-quizzes.constants';
import { UserQuizzesEntity } from '../../entity/entities/user-quizzes.entity';
import { QUESTION_NOT_FOUND_ERROR, QUIZ_NAME_NOT_EXIST_ERROR } from '../constants/quizzes.constants';
import { UserQuizWithQuizModel } from '../models/user-quiz-with-quiz.model';
import { getIsUserQuizFinished } from '../utils/user-quiz.utils';

@Injectable()
export class UserQuizzesService {
  constructor(
    @InjectModel('UserQuizzes') private readonly userQuizzesModel: Model<UserQuizzesEntity>,
    private readonly quizzesService: QuizzesService
  ) {}

  async findAllByUser(userId: string) {
    const userQuizzes = await this.userQuizzesModel.aggregate<UserQuizWithQuizModel>([
      { $match: { userId } },
      { $lookup: { from: 'quizzes', localField: 'quizId', foreignField: '_id', as: 'quiz' } },
      {
        $unwind: { path: '$quiz' }
      }
    ]);

    return userQuizzes.map(userQuiz => ({ ...userQuiz, isFinished: getIsUserQuizFinished(userQuiz) }));
  }

  async findByName(userId: string, quizName: string) {
    const quiz = await this.quizzesService.getByName(quizName);
    if (!quiz) {
      throw new NotFoundException(QUIZ_NAME_NOT_EXIST_ERROR);
    }
    const [userQuiz] = await this.userQuizzesModel
      .aggregate<UserQuizWithQuizModel>([
        { $match: { userId, quizId: quiz._id } },
        { $lookup: { from: 'quizzes', localField: 'quizId', foreignField: '_id', as: 'quiz' } },
        {
          $unwind: { path: '$quiz' }
        }
      ])
      .exec();
    return {
      ...userQuiz,
      isFinished: getIsUserQuizFinished(userQuiz)
    };
  }

  async create(userId: string, quizName: string) {
    const quiz = await this.quizzesService.getByName(quizName);
    if (!quiz) {
      throw new NotFoundException(QUIZ_NAME_NOT_EXIST_ERROR);
    }

    const userQuiz = await this.userQuizzesModel.findOne({ userId, quizId: quiz._id });
    if (userQuiz) {
      throw new BadRequestException(USER_QUIZ_ALREADY_EXIST_ERROR);
    }

    await this.userQuizzesModel.create({ userId, quizId: quiz._id });
    return this.findByName(userId, quizName);
  }

  async delete(userId: string, quizName: string) {
    const quiz = await this.quizzesService.getByName(quizName);
    await this.userQuizzesModel.findOneAndRemove({ userId, quizId: quiz._id });
    return this.findByName(userId, quizName);
  }

  async createAnswer(userId: string, dto: CreateAnswerDto) {
    const quiz = await this.quizzesService.getByName(dto.quizName);
    const userQuiz = await this.userQuizzesModel.findOne({ userId, quizId: quiz._id }).exec();
    if (!userQuiz) {
      throw new NotFoundException(USER_QUIZ_NOT_EXIST_ERROR);
    }

    const question = quiz.questions.find(questionItem => questionItem._id.toHexString() === dto.questionId);
    if (!question) {
      throw new NotFoundException(QUESTION_NOT_FOUND_ERROR);
    }

    const existedAnswer = userQuiz.answers.find(
      answer => answer.questionId.toHexString() === question._id.toHexString()
    );
    if (!existedAnswer) {
      await this.userQuizzesModel
        .findOneAndUpdate(
          { _id: userQuiz._id },
          {
            $push: { answers: { questionId: dto.questionId, value: dto.check } }
          }
        )
        .exec();
      return this.findByName(userId, dto.quizName);
    }

    await this.userQuizzesModel
      .findOneAndUpdate(
        { _id: userQuiz._id },
        {
          answers: userQuiz.answers.map(answer =>
            answer._id.toHexString() !== existedAnswer._id.toHexString()
              ? answer
              : { _id: answer._id, questionId: answer.questionId, value: dto.check }
          )
        },
        { new: true }
      )
      .exec();
    return this.findByName(userId, dto.quizName);
  }
}
