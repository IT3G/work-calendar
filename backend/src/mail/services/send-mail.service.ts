import { Injectable } from '@nestjs/common';
import { Config, getConfig } from '../../config/config';
import { SendMailRequestModel } from '../models/send-mail.request.model';
const nodemailer = require('nodemailer');
const config = getConfig();

@Injectable()
export class SendMailService {
  constructor(private configMail: Config) {}

  public async sendMail(data: SendMailRequestModel): Promise<string> {
    if (config.FEATURE_SEND_MAIL !== 'YES') {
      return;
    }

    process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';

    const transporter = nodemailer.createTransport({
      host: this.configMail.MAIL_HOST,
      port: 25,
      secure: false,
    });

    const users = data.address.join(',');

    let message = `Пользователь ${data.author} изменил присутсвие на <b>${data.date}</b> для ${data.user} на <u>${data.status}</u>`;

    if (data.dateEnd) {
      message = `Пользователь ${data.author} изменил присутсвие c <b>${data.date}</b> по <b>${data.dateEnd}</b> для ${data.user} на <u>${data.status}</u>`;
    }

    if (data.comment) {
      message = message + `<br><br>${data.comment}`;
    }

    const info = await transporter.sendMail({
      from: `${this.configMail.MAIL_SENDER_NAME}<${this.configMail.MAIL_SENDER_ADDRESS}>`,
      to: users,
      subject: 'Изменение присутствия',
      html: message,
    });

    return info.messageId;
  }
}
