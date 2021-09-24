import { Document, Types } from 'mongoose';

export interface UserQuizzesAnswerEntity extends Document {
  questionId: Types.ObjectId;
  value: boolean;
}

export interface UserQuizzesEntity extends Document {
  userId: Types.ObjectId;
  quizId: Types.ObjectId;
  answers: UserQuizzesAnswerEntity[];
}
