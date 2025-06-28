import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { join, resolve } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as cookieParser from 'cookie-parser';

export const whitelist = [
  'http://localhost:5173',
  'http://localhost:3000',
  'http://localhost:3001',
  'https://admin.erdenezuu.mn',
  'https://mybox.mn',
  'https://admin.mybox.mn',
];

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.enableCors({
    origin: function (origin, callback) {
      console.debug('origin:', origin);

      if (!origin || origin === 'null' || whitelist.indexOf(origin) !== -1) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        callback(null, true);
      } else {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  });
  app.setGlobalPrefix('/api');
  app.useStaticAssets(join(__dirname, '..', 'uploads'), {
    prefix: '/uploads/',
  });

  app.use(cookieParser());

  app.setBaseViewsDir(resolve(__dirname, '../views'));
  app.setViewEngine('hbs');

  console.info(`Server is running on http://localhost:${process.env.PORT}`);
  await app.listen(process.env.PORT ?? 8080);
}
bootstrap();
