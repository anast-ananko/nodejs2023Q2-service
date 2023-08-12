import { Module } from '@nestjs/common';

import { MyLogger } from './logger.service';
import { FileLoggerService } from './file-logger.service';

@Module({
  providers: [MyLogger, FileLoggerService],
  exports: [MyLogger],
})
export class LoggerModule {}
