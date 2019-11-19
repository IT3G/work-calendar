import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { getConfig } from './config/config';
const config = getConfig();
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  const options = new DocumentBuilder()
  .setTitle('Work-Calendar')
  .setDescription('The Work-Calendar API description')
  .setVersion('1.0')
  .addTag('')
  .build();

  const document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup('api', app, document);

  await app.listen(config['APP_PORT']);
}
bootstrap();
