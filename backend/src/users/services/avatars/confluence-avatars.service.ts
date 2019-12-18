import { HttpService, Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { switchMap } from 'rxjs/operators';
import { Config } from '../../../config/config';
import { AvatarsService } from './avatars.service';

@Injectable()
export class ConfluenceAvatarService extends AvatarsService {
  constructor(private http: HttpService, private config: Config) {
    super();
  }

  public async getAvatarByLogin(login: string): Promise<AxiosResponse<any>> {
    const authData = {
      username: this.config.CONFLUENCE_LOGIN,
      password: this.config.CONFLUENCE_PASSWORD
    };

    return this.http
      .get(`${this.config.CONFLUENCE_BASE_URL}/rest/api/user?username=${login}`, {
        auth: authData
      })
      .pipe(
        switchMap(userInfoResponse => {
          const fullPicturePath = `${this.config.CONFLUENCE_BASE_URL}${userInfoResponse.data.profilePicture.path}`;
          return this.http.get(fullPicturePath, {
            auth: authData,
            responseType: 'arraybuffer'
          });
        })
      )
      .toPromise();
  }
}
