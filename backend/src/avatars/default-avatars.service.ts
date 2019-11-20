import { HttpService, Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { AvatarsService } from './avatars.service';

@Injectable()
export class DefaultAvatarsService extends AvatarsService {
  constructor(private http: HttpService) {
    super();
  }

  public async getAvatarByLogin(login: string): Promise<AxiosResponse<any>> {
    return new Promise((res, rej) => rej());
  }
}
