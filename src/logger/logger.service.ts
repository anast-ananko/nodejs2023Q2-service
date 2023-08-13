import { Injectable, LoggerService } from '@nestjs/common';

import { IMessage } from '../interfaces/message.interface';
import { ANSIColors, logData } from '../utils/logData';
import { FileLoggerService } from './file-logger.service';
import { writeErrorData } from '../utils/writeErrorData';

@Injectable()
export class MyLogger implements LoggerService {
  constructor(private readonly fileLogger: FileLoggerService) {}

  private logLevel = 0;

  setLogLevel(level: number) {
    this.logLevel = level;
  }

  private shouldLog(level: number): boolean {
    return level >= this.logLevel;
  }

  log(message: IMessage, level = 0) {
    if (this.shouldLog(level)) {
      logData(message, ANSIColors.LOG);
      this.fileLogger.log(message);
    }
  }

  error(message: IMessage, level = 0) {
    if (this.shouldLog(level)) {
      logData(message, ANSIColors.ERROR);
      this.fileLogger.error(message);
      writeErrorData(message);
    }
  }

  warn(message: IMessage, level = 0) {
    if (this.shouldLog(level)) {
      logData(message, ANSIColors.WARN);
      this.fileLogger.warn(message);
    }
  }

  debug?(message: IMessage, level = 0) {
    if (this.shouldLog(level)) {
      logData(message, ANSIColors.DEBUG);
      this.fileLogger.debug(message);
    }
  }

  verbose?(message: IMessage, level = 0) {
    if (this.shouldLog(level)) {
      logData(message, ANSIColors.VERBOSE);
      this.fileLogger.verbose(message);
    }
  }
}
