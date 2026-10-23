import type Production from '../Production.mjs';

/**
 * @summary An error when some expectation of the ASN.1 parser failed
 * @description
 * This is kind of like an assertion failure, but it in
 */
export class ASN1ParserExpectationError extends Error {
  override readonly message: string;

  /**
   * The `Production` in which the error occurs, if known.
   */
  readonly production?: Production;

  /**
   * The current ASN.1 module name.
   */
  readonly moduleName?: string;

  /**
   * The ASN.1 assignment identifier.
   */
  readonly assignment?: string;

  /**
   * @param {string} message The error message.
   * @param {Production} production The `Production` in which the error occurs,
   *  if known.
   * @param {string | undefined} moduleName The current ASN.1 module name.
   * @param {string | undefined} assignment The ASN.1 assignment identifier
   * @constructor
   */
  constructor(
    message: string,
    production?: Production,
    moduleName?: string,
    assignment?: string,
  ) {
    super(message);
    this.message = message;
    this.production = production;
    this.moduleName = moduleName;
    this.assignment = assignment;
  }
}

export default ASN1ParserExpectationError;
