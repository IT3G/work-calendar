import { Schema, Types } from 'mongoose';

export const UserQuizzesSchema = new Schema({
  userId: { type: Types.ObjectId, ref: 'Users' },
  quizId: { type: Types.ObjectId, ref: 'Quizzes' },
  answers: {
    type: [
      {
        questionId: { type: Types.ObjectId, ref: 'Quizzes.questions' },
        value: Boolean
      }
    ],
    default: []
  }
});
