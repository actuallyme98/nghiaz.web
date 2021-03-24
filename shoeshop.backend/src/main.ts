import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import * as cookieParser from 'cookie-parser';
import * as passport from 'passport';
import * as session from 'express-session';
import flash = require('connect-flash');
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  // configuration
  const configService = app.get(ConfigService);
  // validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );
  // enable cors
  app.enableCors({
    credentials: true,
    origin: true,
  }); // TODO: Remove when run production
  app.use(cookieParser());
  app.use(
    session({
      secret: 'bluewind2021',
      resave: false,
      saveUninitialized: false,
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(flash());
  // set dir view engine
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  // swagger
  const options = new DocumentBuilder()
    .setTitle('Bluewind API')
    .setVersion('0.1')
    .addBearerAuth()
    .addCookieAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('swagger', app, document);
  // listen
  await app.listen(configService.get('app.port'));
}
bootstrap();
