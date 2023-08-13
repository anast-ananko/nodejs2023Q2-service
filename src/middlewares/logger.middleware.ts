import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

import { MyLogger } from '../logger/logger.service';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private readonly logger: MyLogger) {}

  use(request: Request, response: Response, next: NextFunction): void {
    const { method, url, params, body } = request;

    response.on('finish', () => {
      const { statusCode } = response;

      const firstDigit = Math.floor(statusCode / 100);

      switch (firstDigit) {
        case 1:
        case 2:
          this.logger.log(
            {
              method,
              url,
              params,
              body,
              statusCode,
            },
            0,
          );
          break;
        case 3:
        case 4:
          this.logger.warn(
            {
              method,
              url,
              params,
              body,
              statusCode,
            },
            1,
          );
          break;
        case 5:
          this.logger.error(
            {
              method,
              url,
              params,
              body,
              statusCode,
            },
            2,
          );
          break;
        default:
          this.logger.verbose(
            {
              method,
              url,
              params,
              body,
              statusCode,
            },
            0,
          );
      }
    });

    next();
  }
}
