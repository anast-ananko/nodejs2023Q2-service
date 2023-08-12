import { Injectable, LoggerService } from '@nestjs/common';

import { IMessage } from '../interfaces/message.interface';
import { writeData } from 'src/utils/writeData';

@Injectable()
export class FileLoggerService implements LoggerService {
  log(message: IMessage) {
    writeData('LOG', message);
  }

  error(message: IMessage) {
    writeData('ERROR', message);
  }

  warn(message: IMessage) {
    writeData('WARN', message);
  }

  debug(message: IMessage) {
    writeData('DEBUG', message);
  }

  verbose(message: IMessage) {
    writeData('VERBOSE', message);
  }
}
