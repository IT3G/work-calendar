import { Document } from 'mongoose';

export class RefreshTokenEntity extends Document {
  token: string;
  userId: string;
}
