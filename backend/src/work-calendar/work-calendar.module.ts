import { HttpModule, MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { Config, getConfig } from '../config/config';
import { EntityModule } from '../entity/entity.module';
import { AuthMiddleware } from './middleware/auth.middleware';
import { AuthService } from './services/auth.service';
import { LdapService } from './services/ldap.service';
import { WebPushModule } from '../web-push/web-push.module';
import { MailModule } from '../mail/mail.module';
import { TasksController } from './controllers/tasks.controller';
import { TaskService } from './services/task.service';
import { AuthController } from './controllers/auth.controller';
import { ProfileModule } from '../profile/profile.module';

const config = getConfig();

@Module({
  imports: [
    EntityModule,
    HttpModule,
    ProfileModule,
    MailModule,
    WebPushModule,
    JwtModule.register({
      secret: config.JWT_SECRET_KEY,
      signOptions: { expiresIn: config.JWT_EXPIRES }
    })
  ],
  controllers: [AuthController, TasksController],
  providers: [LdapService, AuthService, TaskService, { provide: Config, useValue: config }]
})
export class WorkCalendarModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
