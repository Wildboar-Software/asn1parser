import type Production from '../Production.mjs';

/**
 * @summary A syntactic error
 * @description
 * This represents a syntactic error in ASN.1.
 */
export class ASN1SyntaxError extends SyntaxError {
  /**
   * The `Production` in which the syntax error occurs.
   */
  readonly production: Production;

  override readonly message: string;

  /**
   * The current ASN.1 module name.
   */
  readonly moduleName?: string;

  /**
   * @param {Production} production The `Production` in which the syntax error
   *  occurs.
   * @param {string} message The error message.
   * @param {string | undefined} moduleName The current ASN.1 module name.
   * @constructor
   */
  constructor(
    production: Production,
    message: string,
    moduleName?: string,
  ) {
    super(message);
    this.production = production;
    this.message = message;
    this.moduleName = moduleName;
  }
}

export default ASN1SyntaxError;
