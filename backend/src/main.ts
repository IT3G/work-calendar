import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { getConfig } from './config/config';
const config = getConfig();
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(config['APP_PORT']);
}
bootstrap();
