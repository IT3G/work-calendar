import { Injectable } from '@nestjs/common';
import { Config } from '../../config/config';
import { SendMailRequestModel } from '../models/send-mail.request.model';

import * as nodemailer from 'nodemailer';
import { DateFormatter } from '../../shared/services/date-formatter.service';

@Injectable()
export class SendMailService {
  constructor(private config: Config, private dateFormatter: DateFormatter) {}

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

    const date = this.dateFormatter.parseDateStringToRussianLocale(data.date);

    let message = `Пользователь ${data.author} изменил присутсвие на <b>${date}</b> для ${data.user} на <u>${data.status}</u>`;

    if (data.dateEnd) {
      const dateEnd = this.dateFormatter.parseDateStringToRussianLocale(data.dateEnd);
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
