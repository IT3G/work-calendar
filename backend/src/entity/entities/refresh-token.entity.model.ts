import { Document } from 'mongoose';
import { RefreshToken } from 'src/profile/models/refresh-token.model';

export type RefreshTokenEntity = Document & RefreshToken;
