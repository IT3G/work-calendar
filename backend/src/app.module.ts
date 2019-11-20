import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { AvatarsModule } from './avatars/avatars.module';
import { Config, getConfig } from './config/config';
import { MailModule } from './mail/mail.module';
import { ProjectsModule } from './projects/projects.module';
import { TasksModule } from './tasks/tasks.module';
import { UsersModule } from './users/users.module';
const config = getConfig();

const url = `mongodb://${config['DATABASE_USER']}:${config['DATABASE_PASSWORD']}@${config['DATABASE_URL']}`;

@Module({
  imports: [
    AuthModule,
    MailModule,
    UsersModule,
    TasksModule,
    ProjectsModule,
    AvatarsModule,
    MongooseModule.forRoot(url, {
      useNewUrlParser: true
    })
  ],
  providers: [{ provide: Config, useValue: config }]
})
export class AppModule {}
