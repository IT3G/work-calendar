import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, Req } from '@nestjs/common';
import { ObjectIdValidationPipe } from '../../pipes/object-id.validation.pipe';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiUseTags } from '@nestjs/swagger';
import { CreateAnswerDto } from '../dto/create-answer.dto';
import { UserQuizzesService } from '../services/user-quizzes.service';
import { TokenService } from '../../work-calendar/services/token.service';
import { Request } from 'express';
import { USER_QUIZ_NOT_EXIST_ERROR } from '../constants/user-quizzes.constants';
import { CustomMapper } from '../../shared/services/custom-mapper.service';
import { UserQuizDto } from '../dto/user-quiz.dto';

@ApiBearerAuth()
@ApiUseTags('UserQuizzes')
@Controller('user-quizzes')
export class UserQuizzesController {
  constructor(
    private readonly userQuizzesService: UserQuizzesService,
    private readonly tokenService: TokenService,
    private readonly customMapper: CustomMapper
  ) {}

  @ApiOperation({ title: 'Получение списка опросов для пользователя' })
  @ApiOkResponse({ type: [UserQuizDto] })
  @Get('/find/by-user/:userId')
  async getAllByUser(@Param('userId', ObjectIdValidationPipe) userId: string): Promise<UserQuizDto[]> {
    const userQuizzes = await this.userQuizzesService.findAllByUser(userId);
    return this.customMapper.mapArray(UserQuizDto, userQuizzes);
  }

  @ApiOperation({ title: 'Получение списка опросов для текущего пользователя' })
  @ApiOkResponse({ type: [UserQuizDto] })
  @Get('/find/by-current-user')
  async getAllByCurrentUser(@Req() request: Request): Promise<UserQuizDto[]> {
    const user = await this.tokenService.verifyByRequesAndGetUser(request);
    const userQuizzes = await this.userQuizzesService.findAllByUser(user._id);
    return this.customMapper.mapArray(UserQuizDto, userQuizzes);
  }

  @ApiOperation({ title: 'Получение опроса для текущего пользователя по name опроса' })
  @ApiOkResponse({ type: UserQuizDto })
  @Get('/find/by-name/:quizName')
  async getByName(@Req() request: Request, @Param('quizName') quizName: string): Promise<UserQuizDto> {
    const user = await this.tokenService.verifyByRequesAndGetUser(request);
    const userQuiz = await this.userQuizzesService.findByName(user._id, quizName);
    return this.customMapper.map(UserQuizDto, userQuiz);
  }

  @ApiOperation({ title: 'Привязка опроса к пользователю по name опроса' })
  @ApiCreatedResponse({ type: UserQuizDto })
  @Post('/:userId/:quizName')
  async create(
    @Param('userId', ObjectIdValidationPipe) userId: string,
    @Param('quizName') quizName: string
  ): Promise<UserQuizDto> {
    const newUserQuiz = await this.userQuizzesService.create(userId, quizName);
    return this.customMapper.map(UserQuizDto, newUserQuiz);
  }

  @ApiOperation({ title: 'Отвязка опроса от пользователя по name опроса' })
  @ApiOkResponse({ type: UserQuizDto })
  @Delete('/:userId/:quizName')
  async deleteByName(
    @Param('userId', ObjectIdValidationPipe) userId: string,
    @Param('quizName') quizName: string
  ): Promise<UserQuizDto> {
    const deletedUserQuiz = await this.userQuizzesService.delete(userId, quizName);
    if (!deletedUserQuiz) {
      throw new NotFoundException(USER_QUIZ_NOT_EXIST_ERROR);
    }
    return this.customMapper.map(UserQuizDto, deletedUserQuiz);
  }

  @ApiOperation({ title: 'Ответ на вопрос пользователем' })
  @ApiOkResponse({ type: UserQuizDto })
  @Patch('/answer')
  async createAnswer(
    @Req() request: Request,
    @Body()
    dto: CreateAnswerDto
  ): Promise<UserQuizDto> {
    const user = await this.tokenService.verifyByRequesAndGetUser(request);
    const updatedUserQuiz = await this.userQuizzesService.createAnswer(user._id, dto);
    return this.customMapper.map(UserQuizDto, updatedUserQuiz);
  }
}

// Авторизоваться | userId=614f27dba021bf4a348f1491
// Создать квиз с именем string
// Создать второй квиз с именем string1
// Привязать string к пользователю
// Привязать string1 к пользователю
// Получить опрос string | questionId=[614df5a18009f9575416c0c2]
// Ответить на вопросы string
