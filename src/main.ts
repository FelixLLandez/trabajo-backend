import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await NestFactory.create(AppModule, {
    cors: true,
  });
  app.use(
    cors({
      origin: 'http://localhost:4200',
      credential: true,
    }),
  );

  app.setGlobalPrefix('api');
  await app.listen(3000);
}
bootstrap();
