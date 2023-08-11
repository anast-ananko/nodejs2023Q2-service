import { IMessage } from '../interfaces/message.interface';

export enum ANSIColors {
  LOG = '\x1b[32m', //green
  ERROR = '\x1b[31m', //red
  WARN = '\x1b[33m', //yellow
  DEBUG = '\x1b[34m', //blue
  VERBOSE = '\x1b[2m', //dim
  RESET = '\x1b[0m', //reset
}

export const logData = (message: IMessage, color: string) => {
  console.log(
    `${color}Method: ${message.method}    URL: ${
      message.url
    }    Query Parameters: ${JSON.stringify(
      message.params['0'],
    )}    Body: ${JSON.stringify(message.body)}    Status Code: ${
      message.statusCode
    } ${ANSIColors.RESET}`,
  );
};
