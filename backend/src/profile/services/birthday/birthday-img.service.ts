import { Injectable } from '@nestjs/common';
import { BirthdayService } from './birthday.service';
import * as puppeteer from 'puppeteer';
import * as fs from 'fs';
import * as moment from 'moment';
import * as fileType from 'file-type';
import { UserBirthdayDto } from '../../dto/user-birthday.dto';
import { ProfileUtils } from '../../utils/profile.utils';
import { AvatarsService } from '../avatars/avatars.service';

@Injectable()
export class BirthdayImgService {
  constructor(private birthdayService: BirthdayService, private avatarService: AvatarsService) {}

  async getCurrentMonthImg(): Promise<Buffer> {
    const users = await this.birthdayService.findUsersByWeek();
    const html = await fs.promises.readFile('./resources/birthday/birthday.html');

    const htmlWithContent = html.toString().replace('{users}', await this.generateHtmlFromUsers(users));

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setViewport({
      width: 960,
      height: 760,
      deviceScaleFactor: 1,
    });
    await page.setContent(htmlWithContent);

    const result = (await page.screenshot({ encoding: 'binary' })) as Buffer;
    await browser.close();

    return result;
  }

  private async generateHtmlFromUsers(users: UserBirthdayDto[]): Promise<string> {
    const usersToMap = [];

    for (let index = 0; index < users.length; index++) {
      const u = users[index];
      console.log(u.birthday);
      const currentDayIndex = usersToMap.findIndex((i) => i.birthday === moment(u.birthday).format('DD.MM'));

      if (currentDayIndex < 0) {
        usersToMap.push({ birthday: moment(u.birthday).format('DD.MM'), value: await this.getUserHtml(u) });
      } else {
        const newValue = usersToMap[currentDayIndex].value + (await this.getUserHtml(u));
        usersToMap[currentDayIndex].value = newValue;
      }
    }

    return usersToMap
      .map((i) => {
        return `<div>
                <div class="day mb-10">${i.birthday}</div>
                <div class="users">${i.value}</div>
            </div>`;
      })
      .join('');
  }

  private async getUserHtml(user: UserBirthdayDto): Promise<string> {
    let avatar;

    try {
      const avatarResponse = await this.avatarService.getAvatarByLogin(user.mailNickname);
      const ft = await fileType.fromBuffer(avatarResponse.data);
      const ftResult = ft.ext === 'xml' ? 'image/svg+xml' : ft.mime;
      avatar = avatarResponse
        ? `<img src="data:${ftResult};base64, ${(avatarResponse.data as Buffer).toString('base64')}" />`
        : '';
    } catch (error) {
      console.log(error);
      avatar = '';
    }

    console.log(avatar);

    return `<div class="user mb-10 flex">
            <div class="img-container">${avatar}</div>
            <div>
                <div class="user-name orange">${ProfileUtils.trimPatronimyc(user.username)}</div>
                <div class="user-location">г. ${user.location}</div>
            </div>
        </div>`;
  }
}
