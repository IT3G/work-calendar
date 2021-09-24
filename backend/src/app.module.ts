import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Config, getConfig } from './config/config';
import { DictionaryModule } from './dictionary/dictionary.module';
import { HolidaysModule } from './holidays/holidays.module';
import { MailModule } from './mail/mail.module';
import { ProfileModule } from './profile/profile.module';
import { SettingsModule } from './settings/settings.module';
import { WebPushModule } from './web-push/web-push.module';
import { WorkCalendarModule } from './work-calendar/work-calendar.module';
import { SkillsModule } from './skills/skills.module';
import { FirstStepsModule } from './first-steps/first-steps.module';

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
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false
    }),
    SkillsModule,
    FirstStepsModule
  ],
  providers: [{ provide: Config, useValue: config }],
  exports: [WorkCalendarModule]
})
export class AppModule {}
