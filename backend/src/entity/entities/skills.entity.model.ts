import { Document } from 'mongoose';

export class SkillsEntity extends Document {
  logoName: string;
  name: string;
  hint: string;
}
