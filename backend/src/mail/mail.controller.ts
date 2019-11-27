import { Body, Controller, Post, Res } from '@nestjs/common';
import { SendMailRequestModel } from './models/send-mail.request.model';
import { SendMailService } from './services/send-mail.service';
import { ApiUseTags } from '@nestjs/swagger';

@ApiUseTags('Mail')
@Controller('mail')
export class MailController {
  constructor(private sendMailService: SendMailService) {}
  @Post()
  async sendMail(@Res() res, @Body() body: SendMailRequestModel) {
    const info = await this.sendMailService.sendMail(body);
    res.status(202).send({ id: info });
  }
}
