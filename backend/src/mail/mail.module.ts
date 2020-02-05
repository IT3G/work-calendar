import { Module } from '@nestjs/common';
import { Config, getConfig } from '../config/config';
import { SendMailService } from './services/send-mail.service';

@Module({
  providers: [SendMailService, { provide: Config, useValue: getConfig() }],
  exports: [SendMailService]
})
export class MailModule {}
