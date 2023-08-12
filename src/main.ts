import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { config } from 'dotenv';
import { SwaggerModule } from '@nestjs/swagger';
import * as fs from 'fs';
import * as path from 'path';
import * as jsYaml from 'js-yaml';

import { MyLogger } from './logger/logger.service';
import { AllExceptionsFilter } from './filter/exceptions.filter';

config();
const port = process.env.PORT || 4000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  const swaggerFilePath = path.resolve(process.cwd(), 'doc', 'api.yaml');
  const swaggerFileContent = fs.readFileSync(swaggerFilePath, 'utf8');
  const swaggerObject = jsYaml.load(swaggerFileContent);
  SwaggerModule.setup('/doc', app, swaggerObject);

  app.useGlobalPipes(new ValidationPipe());
  //app.useLogger(app.get(MyLogger));
  const httpAdapter = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));

  await app.listen(port);
}
bootstrap();
