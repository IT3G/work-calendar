import { UserQuizzesEntity } from '../../entity/entities/user-quizzes.entity';
import { QuizzesEntity } from '../../entity/entities/quizzes.entity';

export type UserQuizWithQuizModel = UserQuizzesEntity & { quiz: QuizzesEntity };
