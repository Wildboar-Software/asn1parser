import type Logger from './Logger.js';

/**
 * @summary A generic context to pass between functions
 */
export default interface Context {
  /**
   * @summary The log plugin
   * @member {Logger}
   */
  readonly log: Logger;
}
