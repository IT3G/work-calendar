import { Injectable } from '@nestjs/common';
import nodemailer from 'nodemailer';
import { Config } from '../../config/config';
import { SendMailRequestModel } from '../models/send-mail.request.model';

@Injectable()
export class SendMailService {
  constructor(private config: Config) {}

  public async sendMail(data: SendMailRequestModel): Promise<string> {
    process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';

    const transporter = nodemailer.createTransport({
      host: this.config.MAIL_HOST,
      port: 25,
      secure: false
    });

    const users = data.adress.join(',');

    const message = `Пользователь ${data.author} изменил присутсвие на <b>${data.date}</b> для ${data.user} на <u>${data.status}</u>`;

    let info = await transporter.sendMail({
      from: `${this.config.MAIL_SENDER_NAME}<${this.config.MAIL_SENDER_ADDRESS}>`,
      to: users,
      subject: 'Изменение присутствия',
      html: message
    });

    return info.messageId;
  }
}
