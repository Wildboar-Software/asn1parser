/**
 * @summary The location of something within ASN.1 text
 */
export default interface Location {
  /**
   * @summary The directory in which the ASN.1-processing program that uses
   * this library was executed.
   * @member {string}
   */
  readonly executionDirectory?: string;

  /**
   * @summary The name of the file from whence the ASN.1 is sourced.
   * @member {string}
   */
  readonly fileName?: string;

  /**
   * @summary The positional index that identifies the start of this thing.
   * @member {number}
   */
  readonly startIndex: number;

  /**
   * @summary The positional index that identifies the ending of this thing.
   * @member {number}
   */
  readonly endIndex: number;

  /**
   * @summary The line number where this thing appears in the text.
   * @member {number}
   */
  readonly lineNumber: number;

  /**
   * @summary The column number where this thing appears in the text.
   * @member {number}
   */
  readonly columnNumber: number;

  /**
   * @summary The name of the ASN.1 module in which this thing appears.
   * @member {string}
   */
  readonly moduleName?: string;

  /**
   * @summary The name of the ASN.1 assignment in which this thing appears.
   * @member {string}
   */
  readonly assignmentName?: string;
}
