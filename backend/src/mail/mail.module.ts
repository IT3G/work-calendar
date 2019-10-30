import { Module } from '@nestjs/common';
import { MailController } from './mail.controller';
import { SendMailService } from './services/send-mail.service';

@Module({
  controllers: [MailController],
  providers: [SendMailService],
})
export class MailModule {}
