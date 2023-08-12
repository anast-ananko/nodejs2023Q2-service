import * as path from 'path';
import { writeFile, mkdir, appendFile } from 'fs/promises';
import { existsSync } from 'fs';

import { IMessage } from '../interfaces/message.interface';

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

export const writeData = async (level: string, message: IMessage) => {
  const timestamp = dateFormat.format(new Date());
  const logEntry = `[${timestamp}] [${level}] - ${JSON.stringify(message)}\n`;

  if (!existsSync(logDir)) {
    await mkdir(logDir);
    await writeFile(logFilePath, '', { flag: 'wx' });
  }

  try {
    await appendFile(logFilePath, logEntry);
  } catch (err) {
    console.error('Error writing to log file:', err);
  }
};
