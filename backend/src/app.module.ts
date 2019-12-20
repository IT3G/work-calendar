import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Config, getConfig } from './config/config';
import { DictionaryModule } from './dictionary/dictionary.module';
import { MailModule } from './mail/mail.module';
import { SettingsModule } from './settings/settings.module';
import { TasksModule } from './tasks/tasks.module';
import { UsersModule } from './users/users.module';
import { HolidaysModule } from './holidays/holidays.module';
const config = getConfig();

const url = `${config.DATABASE_URL}`;

@Module({
  imports: [
    MailModule,
    UsersModule,
    TasksModule,
    HolidaysModule,
    MongooseModule.forRoot(url, {
      useNewUrlParser: true,
    }),
    DictionaryModule,
    SettingsModule,
  ],
  providers: [{ provide: Config, useValue: config }],
})
export class AppModule {}
