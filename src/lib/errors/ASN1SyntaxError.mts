import type Production from '../Production.js';

/**
 * @summary A syntactic error
 * @description
 * This represents a syntactic error in ASN.1.
 */
export default class ASN1SyntaxError extends SyntaxError {
  /**
   * @param {Production} production The `Production` in which the syntax error
   *  occurs.
   * @param {string} message The error message.
   * @constructor
   */
  constructor(readonly production: Production, override readonly message: string) {
    super(message);
  }
}
