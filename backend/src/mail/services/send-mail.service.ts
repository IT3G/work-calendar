import { Injectable } from '@nestjs/common';
import { Config } from '../../config/config';
import { SendMailRequestModel } from '../models/send-mail.request.model';

import * as nodemailer from 'nodemailer';

@Injectable()
export class SendMailService {
  constructor(private config: Config) {}

  public async sendMail(data: SendMailRequestModel): Promise<string> {
    if (this.config.FEATURE_SEND_MAIL !== 'YES') {
      return;
    }

    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

    const transporter = nodemailer.createTransport({
      host: this.config.MAIL_HOST,
      port: 25,
      secure: false,
      tls: { rejectUnauthorized: false }
    });

    const users = data.address.join(',');

    /** Преобразовать iso-строку даты в формат дд-мм-гггг */
    const parseDateToRussianFormat = (isoDate: string) => isoDate.replace(/(\d{4}).?(\d{2}).?(\d{2})/, '$3.$2.$1');

    const date = parseDateToRussianFormat(data.date);

    let message = `Пользователь ${data.author} изменил присутсвие на <b>${date}</b> для ${data.user} на <u>${data.status}</u>`;

    if (data.dateEnd) {
      const dateEnd = parseDateToRussianFormat(data.dateEnd);
      message = `Пользователь ${data.author} изменил присутсвие c <b>${date}</b> по <b>${dateEnd}</b> для ${data.user} на <u>${data.status}</u>`;
    }

    if (data.comment) {
      message = message + `<br><br>${data.comment}`;
    }

    const info = await transporter.sendMail({
      from: `${this.config.MAIL_SENDER_NAME}<${this.config.MAIL_SENDER_ADDRESS}>`,
      to: users,
      subject: 'Изменение присутствия',
      html: message
    });

    return info.messageId;
  }
}
