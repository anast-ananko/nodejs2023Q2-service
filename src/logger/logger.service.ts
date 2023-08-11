import { Injectable, LoggerService } from '@nestjs/common';

import { IMessage } from '../interfaces/message.interface';
import { ANSIColors, logData } from '../utils/logData';

@Injectable()
export class MyLogger implements LoggerService {
  log(message: IMessage) {
    logData(message, ANSIColors.LOG);
  }

  error(message: IMessage) {
    logData(message, ANSIColors.ERROR);
  }

  warn(message: IMessage) {
    logData(message, ANSIColors.WARN);
  }

  debug?(message: IMessage) {
    logData(message, ANSIColors.DEBUG);
  }

  verbose?(message: IMessage) {
    logData(message, ANSIColors.VERBOSE);
  }
}
