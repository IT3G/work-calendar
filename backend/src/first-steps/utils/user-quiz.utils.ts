import { UserQuizWithQuizModel } from '../models/user-quiz-with-quiz.model';

export const getIsUserQuizFinished = (userQuiz: UserQuizWithQuizModel) =>
  userQuiz.quiz.questions.every(
    question =>
      !!userQuiz.answers.find(answer => answer.value && answer.questionId.toHexString() === question._id.toHexString())
  );
