import { Schema } from 'mongoose';

export const QuizzesSchema = new Schema({
  name: { type: String, unique: true },
  questions: {
    type: [
      {
        image: String,
        text: String,
        links: {
          type: [
            {
              name: String,
              url: String
            }
          ],
          default: []
        }
      }
    ],
    default: []
  }
});
