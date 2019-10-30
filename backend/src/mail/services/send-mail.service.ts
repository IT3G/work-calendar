import { Injectable } from '@nestjs/common';
import { SendMailRequestModel } from '../models/send-mail.request.model';
const nodemailer = require('nodemailer');
@Injectable()
export class SendMailService {
  public async sendMail(data: SendMailRequestModel): Promise<string> {
    process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';

    const transporter = nodemailer.createTransport({
      host: 'exchange.it2g.ru',
      port: 25,
      secure: false,
    });

    const users = data.adress.join(',');

    const message = ` Пользователь ${data.author} изменил присутсвие на ${data.date} для ${data.user} на ${data.status}`;
    let info = await transporter.sendMail({
      from: 'Робот Яков<robotovya@it2g.ru>',
      to: users,
      subject: 'Изменение присутствия',
      text: message,
    });

    return info.messageId;
  }
}
