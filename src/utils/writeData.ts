import * as path from 'path';
import { writeFile, mkdir, appendFile, stat, rename } from 'fs/promises';
import { existsSync } from 'fs';

import { IMessage } from '../interfaces/message.interface';

const MAX_LOG_FILE_SIZE = parseInt(
  process.env.MAX_LOG_FILE_SIZE || '20000',
  10,
);

const logDir = path.resolve(__dirname, '..', '..', 'logs');
const logFilePath = path.resolve(logDir, 'app.log');
const dateFormat = new Intl.DateTimeFormat('en', {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
});

const rotateLog = async () => {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const archiveFilePath = path.join(logDir, `app-${timestamp}.log`);

  try {
    await rename(logFilePath, archiveFilePath);
  } catch (error) {
    console.error('Log rotation error:', error);
  }
};

export const writeData = async (level: string, message: IMessage) => {
  const timestamp = dateFormat.format(new Date());
  const logEntry = `[${timestamp}] [${level}] - ${JSON.stringify(message)}\n`;

  try {
    if (!existsSync(logDir)) {
      await mkdir(logDir);
      await writeFile(logFilePath, '', { flag: 'wx' });
    }

    const logFileSize = (await stat(logFilePath)).size;

    if (logFileSize >= MAX_LOG_FILE_SIZE) {
      await rotateLog();
    }

    await appendFile(logFilePath, logEntry);
  } catch (error) {
    console.error('Error writing to log file:', error);
  }
};
