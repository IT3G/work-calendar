import { Injectable, OnApplicationShutdown } from '@nestjs/common';
import { LoginRequestModel } from 'src/auth/models/login.request.model';
import { LoginResponseModel } from 'src/auth/models/login.response.model';
import { Config } from '../../config/config';
const ldap = require('ldapjs');
@Injectable()
export class LdapService implements OnApplicationShutdown {
  constructor(private configService: Config) {}
  config = {
    readerDn: this.configService.READER_DOMAIN_NAME,
    readerPwd: this.configService.READER_PASSWORD,
    serverUrl: this.configService.LDAP_SERVER_URL,
    suffix: this.configService.LDAP_SUFFIX
  };

  client: any;

  onApplicationShutdown() {
    this.client.destroy();
  }

  public async auth(credentials: LoginRequestModel, add?: boolean): Promise<LoginResponseModel> {
    this.client = ldap.createClient({
      url: this.config.serverUrl,
      reconnect: true
    });

    this.client.on('error', err => {
      console.log(err);
    });
    const filter = await this.getFilter(credentials.username);
    const user = await this.search(filter, credentials.password, add);
    const result = user[0];
    result.attributes = result.attributes.map(el => ({
      type: el.type,
      data: this.stringFromUTF8Array(el._vals[0])
    }));

    this.client.destroy();

    const data: LoginResponseModel = this.mapToSendOnClient(result.attributes);
    return data;
  }

  private mapToSendOnClient(attributes: Array<{ type: string; data: string }>): LoginResponseModel {
    return {
      username: this.getAttribute(attributes, 'cn'),
      location: this.getAttribute(attributes, 'l'),
      position: this.getAttribute(attributes, 'title'),
      whenCreated: this.getAttribute(attributes, 'whenCreated'),
      email: this.getAttribute(attributes, 'userPrincipalName'),
      telNumber: this.getAttribute(attributes, 'mobile'),
      physicalDeliveryOfficeName: this.getAttribute(attributes, 'physicalDeliveryOfficeName'),
      mailNickname: this.getAttribute(attributes, 'mailNickname'),
      projects: [],
      isAdmin: false,
      hasMailing: true,
      subdivision: null,
      jobPosition: null,
      authType: 'LDAP',
      hashPswd: null
    };
  }

  private getAttribute(attributes: Array<{ type: string; data: string }>, val: string) {
    const attr = attributes.find(el => el.type === val);

    return attr ? attr.data : null;
  }

  private getFilter(username: string): Promise<string> {
    const login = `${username}${this.configService.MAIL_POSTFIX}`;
    return new Promise((resolve, reject) => {
      this.client.bind(this.config.readerDn, this.config.readerPwd, err => {
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
          scope: 'sub'
        },
        (err, searchRes) => {
          const searchList = [];

          searchRes.on('searchEntry', entry => {
            searchList.push(entry);
          });

          searchRes.on('error', entry => {
            console.log('error');
          });

          searchRes.on('end', retVal => {
            if (!searchList.length) {
              reject({ user: null });
              return;
            }

            this.client.bind(searchList[0].objectName, password, err => {
              if (add && !err) {
                resolve(searchList);
              }
              if (err || !password) {
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
