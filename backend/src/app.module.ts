import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { MailModule } from './mail/mail.module';
import { TasksModule } from './tasks/tasks.module';
import { UsersModule } from './users/users.module';
@Module({
  imports: [
    AuthModule,
    MailModule,
    UsersModule,
    TasksModule,
    MongooseModule.forRoot(
      'mongodb+srv://root:root@cluster0-uvelp.mongodb.net/test?retryWrites=true&w=majority',
      {
        useNewUrlParser: true,
      },
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
