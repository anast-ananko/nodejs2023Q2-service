import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { config } from 'dotenv';
import { SwaggerModule } from '@nestjs/swagger';
import * as fs from 'fs';
import * as path from 'path';
import * as jsYaml from 'js-yaml';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';

import { MyLogger } from './logger/logger.service';
import { AllExceptionsFilter } from './filter/exceptions.filter';
import { AuthGuard } from './auth/jwt-auth.guard';

config();
const port = parseInt(process.env.PORT, 10) || 3000;
const logLevel = parseInt(process.env.LOG_LEVEL, 10) || 0;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  const swaggerFilePath = path.resolve(process.cwd(), 'doc', 'api.yaml');
  const swaggerFileContent = fs.readFileSync(swaggerFilePath, 'utf8');
  const swaggerObject = jsYaml.load(swaggerFileContent);
  SwaggerModule.setup('/doc', app, swaggerObject);

  app.useGlobalPipes(new ValidationPipe());

  app.get(MyLogger).setLogLevel(logLevel);

  const httpAdapter = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));

  const jwtService = app.get(JwtService);
  const reflector = app.get(Reflector);

  app.useGlobalGuards(new AuthGuard(jwtService, reflector));

  process.on('uncaughtException', (error) => {
    console.error('Uncaught Exception thrown:', error);
    process.exit(1);
  });

  process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at Promise:', promise);
  });

  await app.listen(port);
}
bootstrap();
