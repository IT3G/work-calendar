import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Config, getConfig } from './config/config';
import { DictionaryModule } from './dictionary/dictionary.module';
import { MailModule } from './mail/mail.module';
import { SettingsModule } from './settings/settings.module';

import { HolidaysModule } from './holidays/holidays.module';
import { WebPushModule } from './web-push/web-push.module';
import { WorkCalendarModule } from './work-calendar/work-calendar.module';
import { ProfileModule } from './profile/profile.module';
import { FileStorageModule } from './file-storage/file-storage.module';
const config = getConfig();

const url = `${config.DATABASE_URL}`;

@Module({
  imports: [
    WorkCalendarModule,
    ProfileModule,
    MailModule,
    HolidaysModule,
    DictionaryModule,
    SettingsModule,
    WebPushModule,
    MongooseModule.forRoot(url, {
      useNewUrlParser: true
    }),
    FileStorageModule.forRoot({
      endPoint: 'play.min.io',
      port: 9000,
      useSSL: true,
      accessKey: 'Q3AM3UQ867SPQQA43P2F',
      secretKey: 'zuf+tfteSlswRu7BJ86wekitnifILbZam1KYY3TG'
    })
  ],
  providers: [{ provide: Config, useValue: config }]
})
export class AppModule {}
