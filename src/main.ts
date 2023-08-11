import { readFile } from 'fs/promises';
import { join } from 'path';
import { parse } from 'yaml';

import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

import { AppModule } from './app.module';
import { LoggingService } from './logger/logger.service';

import 'dotenv/config';
import 'reflect-metadata';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  app.useLogger(new LoggingService());

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  const document = await readFile(
    join(__dirname, '..', 'doc/api.yaml'),
    'utf-8',
  );
  SwaggerModule.setup('doc', app, parse(document));

  await app.listen(+process.env.PORT || 4000);
}
bootstrap();
