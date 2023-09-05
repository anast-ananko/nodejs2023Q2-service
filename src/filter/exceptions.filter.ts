import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: HttpException, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();

    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    let responseBody = {
      statusCode: httpStatus,
      error: exception.name,
      message:
        httpStatus === HttpStatus.INTERNAL_SERVER_ERROR
          ? 'An unexpected error has occurred'
          : exception.message,
    };

    if (httpStatus !== HttpStatus.INTERNAL_SERVER_ERROR) {
      const response = exception.getResponse();

      if (typeof response === 'object' && response.hasOwnProperty('message')) {
        responseBody = {
          ...responseBody,
          message: (response as any).message,
          error: (response as any).error,
        };
      }
    }

    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }
}
