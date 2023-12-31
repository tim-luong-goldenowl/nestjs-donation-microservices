import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { FRONTEND_SERVICE_URL } from '@app/common/constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({transform: true}));
  app.use(cookieParser());
  app.enableCors(
    {
      "origin": FRONTEND_SERVICE_URL,
      "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
      "preflightContinue": false,
      "optionsSuccessStatus": 204,
      "credentials": true
    }
  );
  await app.listen(3000);
}
bootstrap();
