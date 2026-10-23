/**
 * @summary A level of severity for a log message.
 * @description
 * A const object rather than an enum, so this module is valid under
 * `erasableSyntaxOnly`. The namespace keeps each member usable as a type.
 * @enum
 */
export const LogLevel = {
  debug: 1,
  info: 2,
  warn: 3,
  error: 4,
  silent: 5,
} as const;

export type LogLevel = (typeof LogLevel)[keyof typeof LogLevel];

export namespace LogLevel {
  export type debug = (typeof LogLevel)['debug'];
  export type info = (typeof LogLevel)['info'];
  export type warn = (typeof LogLevel)['warn'];
  export type error = (typeof LogLevel)['error'];
  export type silent = (typeof LogLevel)['silent'];
}

export default LogLevel;
