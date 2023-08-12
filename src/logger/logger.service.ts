import { Injectable, LoggerService } from '@nestjs/common';

import { IMessage } from '../interfaces/message.interface';
import { ANSIColors, logData } from '../utils/logData';
import { FileLoggerService } from './file-logger.service';

@Injectable()
export class MyLogger implements LoggerService {
  constructor(private readonly fileLogger: FileLoggerService) {}

  log(message: IMessage) {
    logData(message, ANSIColors.LOG);
    this.fileLogger.log(message);
  }

  error(message: IMessage) {
    logData(message, ANSIColors.ERROR);
    this.fileLogger.error(message);
  }

  warn(message: IMessage) {
    logData(message, ANSIColors.WARN);
    this.fileLogger.warn(message);
  }

  debug?(message: IMessage) {
    logData(message, ANSIColors.DEBUG);
    this.fileLogger.debug(message);
  }

  verbose?(message: IMessage) {
    logData(message, ANSIColors.VERBOSE);
    this.fileLogger.verbose(message);
  }
}
