import * as path from 'path';
import { rename } from 'fs/promises';

export const rotateLog = async (
  logDir: string,
  logFilePath: string,
  error: boolean,
) => {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const archiveFilePath = path.join(
    logDir,
    `${error ? `error-${timestamp}.log` : `app-${timestamp}.log`}`,
  );

  try {
    await rename(logFilePath, archiveFilePath);
  } catch (error) {
    console.error('Log rotation error:', error);
  }
};
