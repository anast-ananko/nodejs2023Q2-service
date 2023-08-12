import * as path from 'path';
import { appendFile, writeFile, stat } from 'fs/promises';
import { existsSync } from 'fs';

import { IMessage } from '../interfaces/message.interface';
import { rotateLog } from './rotateLog';
import { dateFormat } from './dateFormat';

const MAX_LOG_FILE_SIZE = parseInt(
  process.env.MAX_LOG_FILE_SIZE || '20000',
  10,
);

const logDir = path.resolve(__dirname, '..', '..', 'logs');
const errorLogFilePath = path.resolve(logDir, 'error.log');

export const writeErrorData = async (message: IMessage) => {
  const timestamp = dateFormat.format(new Date());
  const logEntry = `[${timestamp}] [ERROR] - ${JSON.stringify(message)}\n`;

  try {
    if (!existsSync(errorLogFilePath)) {
      await writeFile(errorLogFilePath, '', { flag: 'wx' });
    }

    const logFileSize = (await stat(errorLogFilePath)).size;

    if (logFileSize >= MAX_LOG_FILE_SIZE) {
      await rotateLog(logDir, errorLogFilePath, true);
    }

    await appendFile(errorLogFilePath, logEntry);
  } catch (error) {
    console.error('Error writing to error log file:', error);
  }
};
