import { Test, TestingModule } from '@nestjs/testing';
import { SendMailService } from './send-mail.service';
import { SendMailRequestModel } from '../models/send-mail.request.model';
import { Config } from 'src/config/config';
import * as dotenv from 'dotenv';
import * as fs from 'fs';

describe('Mail Service', () => {
  // let sendMailService: SendMailService;
  // beforeEach(async () => {
  //   const configPath = `./environments/prod.env`;
  //   const configRaw = ({ ...dotenv.parse(fs.readFileSync(configPath)) } as unknown) as Config;
  //   sendMailService = new SendMailService(configRaw);
  // });
  // xit('Can Send', async () => {
  //   // TODO: change address to ur SMTP domain name before run
  //   const mailData: SendMailRequestModel = {
  //     address: ['test@test.ru'],
  //     author: 'Авторка',
  //     date: '2020-01-01',
  //     user: 'Тестовый пользюк',
  //     status: 'Стандартно',
  //     comment: 'Без комментариев',
  //     dateEnd: '2020-02-02'
  //   };
  //   console.log(mailData);
  //   const res = await sendMailService.sendMail(mailData);
  //   console.log('res', res);
  // });
});
