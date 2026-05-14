import type Logger from '../interfaces/Logger.js';
import LogLevel from '../LogLevel.js';

/**
 * @summary A `Logger` that just uses the `console` API.
 * @description
 * This uses the NodeJS `console` API for logging.
 * @constant
 */
const consoleLogger: Logger = {
  level: LogLevel.warn,
  debug: (m: string): void => {
    if (console && consoleLogger.level <= LogLevel.debug) {
      console.debug(`[DEBUG]: ${m}`);
    }
  },
  info: (m: string): void => {
    if (console && consoleLogger.level <= LogLevel.info) {
      console.info(`[INFO]: ${m}`);
    }
  },
  warn: (m: string): void => {
    if (console && consoleLogger.level <= LogLevel.warn) {
      console.warn(`[WARN]: ${m}`);
    }
  },
  error: (m: string): void => {
    if (console && consoleLogger.level <= LogLevel.error) {
      console.error(`[ERROR]: ${m}`);
    }
  },
};

export default consoleLogger;
