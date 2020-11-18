import { Injectable, Logger, OnApplicationShutdown } from '@nestjs/common';
import * as ldap from 'ldapjs';
import * as moment from 'moment';
import { Config } from '../../config/config';
import { UserDto } from '../../profile/dto/user.dto';
import { LoginModel } from '../models/login.model';
@Injectable()
export class LdapService implements OnApplicationShutdown {
  private readonly logger = new Logger('LdapService');

  constructor(private configService: Config) {}
  config = {
    readerDn: this.configService.READER_DOMAIN_NAME,
    readerPwd: this.configService.READER_PASSWORD,
    serverUrl: this.configService.LDAP_SERVER_URL,
    suffix: this.configService.LDAP_SUFFIX,
  };

  client: any;

  onApplicationShutdown() {
    this.client.destroy();
  }

  public async auth(credentials: LoginModel, add?: boolean): Promise<UserDto> {
    this.client = ldap.createClient({
      url: this.config.serverUrl,
      reconnect: true,
    });

    this.client.on('error', (e) => {
      this.logger.error('Ошибка авторизации', e.stack);
    });
    const filter = await this.getFilter(credentials.username);
    const user = await this.search(filter, credentials.password, add);
    const result = user[0];
    result.attributes = result.attributes.map((el) => ({
      type: el.type,
      data: this.stringFromUTF8Array(el._vals[0]),
    }));

    this.client.destroy();

    const data: UserDto = this.mapToSendOnClient(result.attributes);
    return data;
  }

  private mapToSendOnClient(attributes: Array<{ type: string; data: string }>): UserDto {
    const whenCreated = this.getAttribute(attributes, 'whenCreated');
    return {
      _id: undefined,
      username: this.getAttribute(attributes, 'cn'),
      patronymic: null,
      location: this.getAttribute(attributes, 'l'),
      position: this.getAttribute(attributes, 'title'),
      whenCreated: moment(whenCreated.substr(0, 8)).format(),
      email: this.getAttribute(attributes, 'userPrincipalName'),
      telNumber: this.getAttribute(attributes, 'mobile'),
      physicalDeliveryOfficeName: this.getAttribute(attributes, 'physicalDeliveryOfficeName'),
      mailNickname: this.getAttribute(attributes, 'mailNickname'),
      authType: 'LDAP',
      hasMailing: true,
      isAdmin: false,
      subdivision: null,
      jobPosition: null,
      projectsNew: null,
      skype: null,
      telegram: null,
      hashPassword: null,
      terminationDate: null,
      lastProjects: null,
      skills: null,
      birthday: null,
      remoteWork: null,
      lastTimeOnline: moment().toISOString(),
      mattermost: null,
      birthdayHideYear: null,
    };
  }

  private getAttribute(attributes: Array<{ type: string; data: string }>, val: string) {
    const attr = attributes.find((el) => el.type === val);

    return attr ? attr.data : null;
  }

  private getFilter(username: string): Promise<string> {
    const login = `${username}${this.configService.MAIL_POSTFIX}`;
    return new Promise((resolve, reject) => {
      this.client.bind(this.config.readerDn, this.config.readerPwd, (err) => {
        if (err) {
          reject('Reader bind failed ' + err);
          return;
        }

        const filter = this.configService.LDAP_FILTER.replace(/@login@/g, login);

        resolve(filter);
      });
    });
  }

  private search(filter: string, password: string, add: boolean): Promise<any> {
    return new Promise((resolve, reject) => {
      this.client.search(
        this.config.suffix,
        {
          filter,
          scope: 'sub',
        },
        (err, searchRes) => {
          const searchList = [];

          searchRes.on('searchEntry', (entry) => {
            searchList.push(entry);
          });

          searchRes.on('error', (e) => {
            this.logger.error('Ошибка при поиске пользователя', e.stack);
          });

          searchRes.on('end', (retVal) => {
            if (!searchList.length) {
              reject({ user: null });
              return;
            }

            this.client.bind(searchList[0].objectName, password, (error) => {
              if (add && !error) {
                resolve(searchList);
              }
              if (error || !password) {
                reject({ user: null });
              } else {
                resolve(searchList);
              }
            });
          });
        }
      );
    });
  }

  private stringFromUTF8Array(data) {
    const atributtes = [...data];
    const extraByteMap = [1, 1, 1, 1, 2, 2, 3, 0];
    const count = atributtes.length;
    let str = '';

    for (let index = 0; index < count; ) {
      let ch = data[index++];
      if (ch & 0x80) {
        let extra = extraByteMap[(ch >> 3) & 0x07];
        if (!(ch & 0x40) || !extra || index + extra > count) {
          return null;
        }

        ch = ch & (0x3f >> extra);
        for (; extra > 0; extra -= 1) {
          const chx = data[index++];
          // tslint:disable-next-line: triple-equals
          if ((chx & 0xc0) != 0x80) {
            return null;
          }

          ch = (ch << 6) | (chx & 0x3f);
        }
      }

      str += String.fromCharCode(ch);
    }

    return str;
  }
}
