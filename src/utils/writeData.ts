import * as path from 'path';
import { writeFile, mkdir, appendFile, stat } from 'fs/promises';
import { existsSync } from 'fs';

import { IMessage } from '../interfaces/message.interface';
import { rotateLog } from './rotateLog';
import { dateFormat } from './dateFormat';

const MAX_LOG_FILE_SIZE = parseInt(process.env.MAX_LOG_FILE_SIZE, 10) || 20000;

const logDir = path.resolve(__dirname, '..', '..', 'logs');
const logFilePath = path.resolve(logDir, 'app.log');

export const writeData = async (level: string, message: IMessage) => {
  const timestamp = dateFormat.format(new Date());
  const logEntry = `[${timestamp}] [${level}] - ${JSON.stringify(message)}\n`;

  try {
    if (!existsSync(logDir)) {
      await mkdir(logDir);
    }

    if (!existsSync(logFilePath)) {
      await writeFile(logFilePath, '', { flag: 'w' });
    }

    const logFileSize = (await stat(logFilePath)).size;

    if (logFileSize >= MAX_LOG_FILE_SIZE) {
      await rotateLog(logDir, logFilePath, false);
    }

    await appendFile(logFilePath, logEntry);
  } catch (error) {
    console.error('Error writing to log file:', error);
  }
};
