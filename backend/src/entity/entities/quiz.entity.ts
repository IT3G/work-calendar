import { Document, SchemaTimestampsConfig } from 'mongoose';

// tslint:disable-next-line:no-empty-interface
export interface LinkEntity extends SchemaTimestampsConfig {}
export interface LinkEntity extends Document {
  url: string;
  name: string;
}

// tslint:disable-next-line:no-empty-interface
export interface QuestionEntity extends SchemaTimestampsConfig {}
export interface QuestionEntity extends Document {
  imageUrl?: string;
  description: string;
  links?: LinkEntity[];
}

// tslint:disable-next-line:no-empty-interface
export interface QuizEntity extends SchemaTimestampsConfig {}
export interface QuizEntity extends Document {
  name: string;
  questions: QuestionEntity[];
}
