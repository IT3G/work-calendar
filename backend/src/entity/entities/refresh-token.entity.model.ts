import { Document } from 'mongoose';

export class RefreshTokenEntity extends Document {
  token: string;
  date: string;
  userId: string;
}
