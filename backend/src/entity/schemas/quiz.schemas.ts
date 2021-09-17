import { Schema } from 'mongoose';

export const QuizSchema = new Schema(
  {
    name: { type: String, unique: true, required: true },
    questions: [
      {
        imageUrl: String,
        description: String,
        links: [
          {
            url: String,
            name: String
          }
        ]
      }
    ]
  },
  { timestamps: true }
);
