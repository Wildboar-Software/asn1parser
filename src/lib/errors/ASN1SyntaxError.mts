import type Production from '../Production.mjs';

/**
 * @summary A syntactic error
 * @description
 * This represents a syntactic error in ASN.1.
 */
export class ASN1SyntaxError extends SyntaxError {
  /**
   * @param {Production} production The `Production` in which the syntax error
   *  occurs.
   * @param {string} message The error message.
   * @param {string | undefined} moduleName The current ASN.1 module name.
   * @constructor
   */
  constructor(
    readonly production: Production,
    override readonly message: string,
    readonly moduleName?: string,
  ) {
    super(message);
  }
}

export default ASN1SyntaxError;
