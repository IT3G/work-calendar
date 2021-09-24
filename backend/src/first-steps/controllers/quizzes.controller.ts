import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post
} from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiUseTags } from '@nestjs/swagger';
import { CreateQuizDto } from '../dto/create-quiz.dto';
import { UpdateQuizDto } from '../dto/update-quiz.dto';
import { QuizzesService } from '../services/quizzes.service';
import { QUIZ_NAME_NOT_EXIST_ERROR, QUIZ_ALREADY_EXIST_ERROR } from '../constants/quizzes.constants';
import { CustomMapper } from '../../shared/services/custom-mapper.service';
import { QuizDto } from '../dto/quiz.dto';

@ApiBearerAuth()
@ApiUseTags('Quizzes')
@Controller('quizzes')
export class QuizzesController {
  constructor(private readonly quizzesService: QuizzesService, private readonly mapper: CustomMapper) {}

  @ApiOperation({ title: 'Получение всех опросов' })
  @ApiOkResponse({ type: [QuizDto] })
  @Get()
  async getAll(): Promise<QuizDto[]> {
    const quizList = await this.quizzesService.getAll();
    return this.mapper.mapArray(QuizDto, quizList);
  }

  @ApiOperation({ title: 'Получение опроса по name' })
  @ApiOkResponse({ type: QuizDto })
  @Get('/:name')
  async getByName(@Param('name') name: string): Promise<QuizDto> {
    const quiz = await this.quizzesService.getByName(name);
    if (!quiz) {
      throw new NotFoundException(QUIZ_NAME_NOT_EXIST_ERROR);
    }
    return this.mapper.map(QuizDto, quiz);
  }

  @ApiOperation({ title: 'Создание опроса' })
  @ApiCreatedResponse({ type: QuizDto })
  @Post()
  async create(@Body() dto: CreateQuizDto): Promise<QuizDto> {
    const existedQuiz = await this.quizzesService.getByName(dto.name);
    if (existedQuiz) {
      throw new BadRequestException(QUIZ_ALREADY_EXIST_ERROR);
    }
    const createdQuiz = await this.quizzesService.create(dto);
    return this.mapper.map(QuizDto, createdQuiz);
  }

  @ApiOperation({ title: 'Удаление опроса по name' })
  @ApiOkResponse({ type: QuizDto })
  @Delete('/:name')
  async deleteByName(@Param('name') name: string): Promise<QuizDto> {
    const deletedQuiz = await this.quizzesService.deleteByName(name);
    if (!deletedQuiz) {
      throw new NotFoundException(QUIZ_NAME_NOT_EXIST_ERROR);
    }
    return this.mapper.map(QuizDto, deletedQuiz);
  }

  @ApiOperation({ title: 'Обновление опроса по name' })
  @ApiOkResponse({ type: QuizDto })
  @Patch('/:name')
  async patchByName(@Param('name') name: string, @Body() dto: UpdateQuizDto): Promise<QuizDto> {
    const patchedDto = await this.quizzesService.patchByName(name, dto);
    if (!patchedDto) {
      throw new NotFoundException(QUIZ_NAME_NOT_EXIST_ERROR);
    }
    return this.mapper.map(QuizDto, patchedDto);
  }
}
