import { HttpModule, MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { Config, getConfig } from '../config/config';
import { EntityModule } from '../entity/entity.module';
import { FileStorageModule } from '../file-storage/file-storage.module';
import { MailModule } from '../mail/mail.module';
import { ProfileModule } from '../profile/profile.module';
import { SharedModule } from '../shared/shared.module';
import { WebPushModule } from '../web-push/web-push.module';
import { AuthController } from './controllers/auth.controller';
import { TasksController } from './controllers/tasks.controller';
import { guards } from './guards';
import { AuthMiddleware } from './middleware/auth.middleware';
import { AuthService } from './services/auth.service';
import { LdapService } from './services/ldap.service';
import { TaskService } from './services/task.service';
import { VacationResolutionService } from './services/vacation-resolution.service';
import { TokenService } from './services/token.service';

const config = getConfig();

@Module({
  imports: [
    EntityModule,
    SharedModule,
    HttpModule,
    ProfileModule,
    MailModule,
    WebPushModule,
    FileStorageModule,
    JwtModule.register({
      secret: config.JWT_SECRET_KEY,
      signOptions: { expiresIn: config.JWT_EXPIRES }
    })
  ],
  controllers: [AuthController, TasksController],
  providers: [
    TokenService,
    LdapService,
    AuthService,
    TaskService,
    VacationResolutionService,
    { provide: Config, useValue: config },
    ...guards
  ]
})
export class WorkCalendarModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
