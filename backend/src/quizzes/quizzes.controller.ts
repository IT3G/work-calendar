import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  Patch,
  Post
} from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiOperation, ApiResponse, ApiUseTags } from '@nestjs/swagger';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { QuizDto } from './dto/quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';
import { QuizzesService } from './quizzes.service';
import { CustomMapper } from '../shared/services/custom-mapper.service';
import { NAME_QUIZ_ALREADY_EXIST_ERROR, QUIZ_NOT_FOUND_ERROR } from './quizzes.constants';
import { ObjectIdValidationPipe } from './pipes/object-id.validation.pipe';

@ApiBearerAuth()
@ApiUseTags('Quizzes')
@Controller('quizzes')
export class QuizzesController {
  constructor(private readonly quizzesService: QuizzesService, private readonly mapper: CustomMapper) {}

  @ApiOperation({ title: 'Создание опроса' })
  @ApiCreatedResponse({ type: QuizDto })
  @Post()
  async create(@Body() dto: CreateQuizDto): Promise<QuizDto> {
    const existedQuiz = await this.quizzesService.findByName(dto.name);
    if (existedQuiz) {
      throw new BadRequestException(NAME_QUIZ_ALREADY_EXIST_ERROR);
    }
    const newQuiz = await this.quizzesService.create(dto);
    return this.mapper.map(QuizDto, newQuiz);
  }

  @ApiOperation({ title: 'Получение всех опросов' })
  @ApiResponse({ status: HttpStatus.OK, type: [QuizDto] })
  @Get()
  async get(): Promise<QuizDto[]> {
    const quizzes = await this.quizzesService.get();
    return this.mapper.mapArray(QuizDto, quizzes);
  }

  @ApiOperation({ title: 'Получение опроса по идентификатору' })
  @ApiResponse({ status: HttpStatus.OK, type: QuizDto })
  @Get('/:id')
  async getById(@Param('id', ObjectIdValidationPipe) id: string): Promise<QuizDto> {
    const quiz = await this.quizzesService.findById(id);
    if (!quiz) {
      throw new NotFoundException(QUIZ_NOT_FOUND_ERROR);
    }
    return this.mapper.map(QuizDto, quiz);
  }

  @ApiOperation({ title: 'Получение опроса по name' })
  @ApiResponse({ status: HttpStatus.OK, type: QuizDto })
  @Get('/find-by-name/:name')
  async getByName(@Param('name') name: string): Promise<QuizDto> {
    const quiz = await this.quizzesService.findByName(name);
    if (!quiz) {
      throw new NotFoundException(QUIZ_NOT_FOUND_ERROR);
    }
    return this.mapper.map(QuizDto, quiz);
  }

  @ApiOperation({ title: 'Обновление опроса по идентификатору' })
  @ApiResponse({ status: HttpStatus.OK, type: QuizDto })
  @Patch('/:id')
  async patchById(@Param('id', ObjectIdValidationPipe) id: string, @Body() dto: UpdateQuizDto): Promise<QuizDto> {
    const updatedDto = await this.quizzesService.update(id, dto);
    if (!updatedDto) {
      throw new NotFoundException(QUIZ_NOT_FOUND_ERROR);
    }
    return this.mapper.map(QuizDto, updatedDto);
  }

  @ApiOperation({ title: 'Удаление опроса по идентификатору' })
  @ApiResponse({ status: HttpStatus.OK, type: QuizDto })
  @Delete('/:id')
  async deleteById(@Param('id', ObjectIdValidationPipe) id: string): Promise<QuizDto> {
    const removedQuiz = await this.quizzesService.delete(id);
    if (!removedQuiz) {
      throw new NotFoundException(QUIZ_NOT_FOUND_ERROR);
    }
    return this.mapper.map(QuizDto, removedQuiz);
  }
}
