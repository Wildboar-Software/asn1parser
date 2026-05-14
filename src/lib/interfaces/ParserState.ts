import type Production from '../Production.js';
import type ASN1SyntaxError from '../errors/ASN1SyntaxError.js';
import type ParseContext from './ParseContext.js';
import AssignmentType from '../constructs/AssignmentType.js';
import TypeType from '../constructs/TypeType.js';

/**
 * @summary The parser-specific context to be passed between parsers
 */
export default interface ParserState {
  /**
   * @summary The original text to be parsed.
   * @member {string}
   * @readonly
   */
  readonly text: string;

  /**
   * @summary The lexemes produced from lexing the raw ASN.1 text.
   * @member {Production[]}
   * @readonly
   */
  readonly tokens: Production[];

  /**
   * @summary Whether the most recent parsing failed.
   * @description
   * This used to be of type `Error`, but by changing it to a `boolean`, I
   * improved the performance of the compiler FOUR HUNDRED PERCENT, making
   * this the biggest performance improvement I have ever implemented in this
   * library. The reason that generating errors is so costly is that they
   * include a message, a stack trace (which gets generated automatically),
   * and they are much bigger and complex than a `boolean`, generally.
   *
   * This field is populated very frequently, particularly in proportion to
   * the amount of backtracking that must be done, so the performance
   * differences between a `boolean` and an `Error` are dramatically scaled.
   * @member {boolean}
   */
  error?: boolean;

  /**
   * @summary The abstract syntax tree.
   * @member {Production}
   */
  cst: Production;

  /**
   * @summary The index of the Production where the parser left off
   * @member {number}
   */
  index: number;

  /**
   * @summary All syntax errors found during parsing.
   * @description
   * A mapping of indices to syntax errors. A mapping is used instead of an
   * array of errors, because backtracking may result in the same error being
   * inserted multiple times. A simple object (the TypeScript utility type
   * `Record`) is used to map indices to errors, because the native `Map` type
   * does not implement `toJSON()`, and there are practical use cases for
   * outputting the results of parsing to JSON.
   * @member
   * @readonly
   */
  readonly syntaxErrors: Record<number, ASN1SyntaxError>;

  /**
   * @summary All identifiers discovered from parsing
   * @member
   * @readonly
   */
  readonly discoveredIdentifiers: Map<string, AssignmentType | null>;

  /**
   * @summary Callbacks to execute when a specific type of production is read.
   * @member
   * @readonly
   */
  readonly callbackMap: Map<string, (ctx: ParseContext) => void>;

  /**
   * @summary All known syntax tokens within scope.
   * @description
   * This is useful when parsing objects defined using the defined syntax and
   * which use references that are in all capital letters. Such references may
   * be mistaken for tokens.
   * @member
   * @readonly
   */
  readonly definedSyntaxTokens: Set<string>;

  /**
   * @summary All known defined `ENUMERATED` type items
   * @description
   * This is useful for determining, at parsing time, whether an identifier
   * is a `DefinedValue` or an `EnumeratedValue`.
   * @member
   * @readonly
   */
  readonly definedEnumItems: Set<string>;

  /**
   * @summary The current type to be parsed
   * @description
   * Values of different data types are sometimes indistinguishable without
   * context. For example, `{}` could be a `BIT STRING` value or an
   * `OCTET STRING` value. This member stores the most type that hints at the
   * type of the value whose parsing is imminent so such confusion can be
   * avoided at parsing-time.
   *
   * @member
   * @readonly
   */
  currentType?: TypeType;

  /**
   * @summary Whether a `Literal` ending with an "S" was just parsed.
   * @description
   * Determining whether a `Literal` that has just been parsed was a plural
   * word is important because the parser can guess that the next setting is
   * an object set.
   *
   * @member
   * @readonly
   */
  justParsedPluralLiteral?: boolean;
}
