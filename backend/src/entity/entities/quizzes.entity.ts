import { Document } from 'mongoose';

export interface LinkEntity extends Document {
  name: string;
  url: string;
}

export interface QuestionEntity extends Document {
  image: string;
  text: string;
  links: LinkEntity[];
}

export interface QuizzesEntity extends Document {
  name: string;
  questions: QuestionEntity[];
}
