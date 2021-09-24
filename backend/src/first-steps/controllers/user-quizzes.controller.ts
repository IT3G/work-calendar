import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, Req } from '@nestjs/common';
import { ObjectIdValidationPipe } from '../../pipes/object-id.validation.pipe';
import { ApiBearerAuth, ApiOperation, ApiUseTags } from '@nestjs/swagger';
import { CreateAnswerDto } from '../dto/create-answer.dto';
import { UserQuizzesService } from '../services/user-quizzes.service';
import { TokenService } from '../../work-calendar/services/token.service';
import { Request } from 'express';
import { USER_QUIZ_NOT_EXIST_ERROR } from '../constants/user-quizzes.constants';

@ApiBearerAuth()
@ApiUseTags('UserQuizzes')
@Controller('user-quizzes')
export class UserQuizzesController {
  constructor(private readonly userQuizzesService: UserQuizzesService, private readonly tokenService: TokenService) {}

  @ApiOperation({ title: 'Получение списка опросов для пользователя' })
  @Get('/find/by-user/:userId')
  async getAllByUser(@Param('userId', ObjectIdValidationPipe) userId: string) {
    return this.userQuizzesService.findAllByUser(userId);
  }

  @ApiOperation({ title: 'Получение списка опросов для текущего пользователя' })
  @Get('/find/by-current-user')
  async getAllByCurrentUser(@Req() request: Request) {
    const user = await this.tokenService.verifyByRequesAndGetUser(request);
    return this.userQuizzesService.findAllByUser(user._id);
  }

  @ApiOperation({ title: 'Получение опроса для текущего пользователя по name опроса' })
  @Get('/find/by-name/:quizName')
  async getByName(@Req() request: Request, @Param('quizName') quizName: string) {
    const user = await this.tokenService.verifyByRequesAndGetUser(request);
    return this.userQuizzesService.findByName(user._id, quizName);
  }

  @ApiOperation({ title: 'Привязка опроса к пользователю по name опроса' })
  @Post('/:userId/:quizName')
  async create(@Param('userId', ObjectIdValidationPipe) userId: string, @Param('quizName') quizName: string) {
    return this.userQuizzesService.create(userId, quizName);
  }

  @ApiOperation({ title: 'Отвязка опроса от пользователя по name опроса' })
  @Delete('/:userId/:quizName')
  async deleteByName(@Param('userId', ObjectIdValidationPipe) userId: string, @Param('quizName') quizName: string) {
    const deletedUserQuiz = this.userQuizzesService.delete(userId, quizName);
    if (!deletedUserQuiz) {
      throw new NotFoundException(USER_QUIZ_NOT_EXIST_ERROR);
    }
    return deletedUserQuiz;
  }

  @ApiOperation({ title: 'Ответ на вопрос пользователем' })
  @Patch('/answer')
  async createAnswer(
    @Req() request: Request,
    @Body()
    dto: CreateAnswerDto
  ) {
    const user = await this.tokenService.verifyByRequesAndGetUser(request);
    return this.userQuizzesService.createAnswer(user._id, dto);
  }
}

// Авторизоваться | userId=614df5017077435658af35a5
// Создать квиз с именем string
// Создать второй квиз с именем string1
// Привязать string к пользователю
// Привязать string1 к пользователю
// Получить опрос string | questionId=[614df5a18009f9575416c0c2]
// Ответить на вопросы string
