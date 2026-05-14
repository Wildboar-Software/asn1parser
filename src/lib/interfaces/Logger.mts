import type LogLevel from '../LogLevel.mjs';

/**
 * @summary The interface for a logging plugin
 */
export default interface Logger {
  /**
   * @summary The level of severity at which and above which log messages will
   *  be presented or saved.
   * @member {LogLevel}
   */
  level: LogLevel;

  /**
   * @summary Log a message having severity "Debug"
   * @method
   */
  debug: (m: string) => void;

  /**
   * @summary Log a message having severity "Info"
   * @method
   */
  info: (m: string) => void;

  /**
   * @summary Log a message having severity "Warning"
   * @method
   */
  warn: (m: string) => void;

  /**
   * @summary Log a message having severity "Error"
   * @method
   */
  error: (m: string) => void;
}
