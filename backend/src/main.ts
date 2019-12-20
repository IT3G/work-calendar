import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import { getConfig } from './config/config';

const config = getConfig();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  app.use(cookieParser(config.JWT_SECRET_KEY));

  const options = new DocumentBuilder()
    .setTitle('Work-Calendar')
    .setDescription('The Work-Calendar API description')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT || config.APP_PORT);
}

bootstrap();
