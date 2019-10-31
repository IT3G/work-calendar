import { Module } from '@nestjs/common';
import { Config, getConfig } from '../config/config';
import { MailController } from './mail.controller';
import { SendMailService } from './services/send-mail.service';

@Module({
  controllers: [MailController],
  providers: [SendMailService, { provide: Config, useValue: getConfig() }]
})
export class MailModule {}
