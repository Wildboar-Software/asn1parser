import type Production from '../Production.mjs';

/**
 * @summary An error when some expectation of the ASN.1 parser failed
 * @description
 * This is kind of like an assertion failure, but it in
 */
export class ASN1SemanticError extends Error {
  /**
   * @param {string} message The error message.
   * @param {Production} production The `Production` in which the error occurs,
   *  if known.
   * @param {string | undefined} moduleName The current ASN.1 module name.
   * @param {string | undefined} assignment The ASN.1 assignment identifier
   * @constructor
   */
  constructor(
    override readonly message: string,
    readonly production?: Production, 
    readonly moduleName?: string,
    readonly assignment?: string,
  ) {
    super(message);
  }
}

export default ASN1SemanticError;
