import type ParseContext from './interfaces/ParseContext.mjs';
import Production from './Production.mjs';
import consoleLogger from './loggers/console.mjs';
import { ProductionType } from './ProductionType.mjs';
import onDidParseAssignment from './parsers/callbacks/Assignment.mjs';
import onDidParseObjectClassAssignment from './parsers/callbacks/ObjectClassAssignment.mjs';
import onDidParseSymbol from './parsers/callbacks/Symbol.mjs';
import onDidParseEnumerationItem from './parsers/callbacks/EnumerationItem.mjs';
import onDidParseNamedNumber from './parsers/callbacks/NamedNumber.mjs';
import onDidParseModuleDefinition from './parsers/callbacks/ModuleDefinition.mjs';
import onDidParseNamedType from './parsers/callbacks/NamedType.mjs';
import onDidParseValue from './parsers/callbacks/Value.mjs';
import onDidParseLiteral from './parsers/callbacks/Literal.mjs';
import {
  createParseMemo,
  lookupMemo,
  memoFingerprint,
  storeMemo,
} from './parseMemo.mjs';

/**
 * @summary A class grouping the code and data for a parser.
 * @class
 */
export default class Parser {
  /**
   * @param name A function that returns the name of the `Parser`
   * @param executor A function that actually parses.
   * @param packrat When true, cache results by token index and semantic context.
   * @public
   * @constructor
   */
  constructor(
    readonly name: () => string,
    readonly executor: (state: ParseContext) => ParseContext,
    /**
     * When true, `execute` caches results by token index and semantic
     * context. Enabled for expensive singleton parsers (`recursiveParser`,
     * `whitespace`, `Setting`). Cheap combinators such as `literal()` skip
     * the table so lookup cost does not exceed the work saved.
     */
    readonly packrat: boolean = false
  ) {}

  /**
   * @summary Kick off a parsing.
   * @description
   * `Parser.execute` can be called directly, but creating a `ParseContext`
   * can be overly complicated. For most cases, just calling this method is
   * preferable.
   *
   * @param {Production[]} tokens The tokens generated from lexing.
   * @param {string} text The underlying text from which the lexical tokens
   *  were generated.
   * @returns {ParseContext} The ending state of the parsing.
   * @public
   * @method
   */
  public start(tokens: Production[], text: string): ParseContext {
    const ret = this.executor({
      log: consoleLogger,
      tokens,
      index: 0,
      cst: new Production(ProductionType.empty, [], {
        startIndex: 0,
        endIndex: 0,
        lineNumber: 1,
        columnNumber: 1,
      }),
      syntaxErrors: {},
      discoveredIdentifiers: new Map([]),
      callbackMap: new Map([
        ['Assignment', onDidParseAssignment],
        ['ObjectClassAssignment', onDidParseObjectClassAssignment],
        ['Symbol', onDidParseSymbol],
        ['EnumerationItem', onDidParseEnumerationItem],
        ['NamedNumber', onDidParseNamedNumber],
        ['ModuleDefinition', onDidParseModuleDefinition],
        ['NamedType', onDidParseNamedType],
        ['Value', onDidParseValue],
        ['Literal', onDidParseLiteral],
      ]),
      text,
      definedSyntaxTokens: new Set([]),
      definedEnumItems: new Set([]),
      memo: createParseMemo(),
    });
    // Drop the packrat table so failed CSTs are not retained on the result.
    ret.memo = undefined;
    return ret;
  }

  /**
   * @summary Call the parser with the given parsing state.
   * @description
   * Calls the parser with the given parsing state, and calls any callbacks
   * (if applicable).
   * @param {ParseContext} state The starting state from which to being
   *  parsing.
   * @returns {ParseContext} The parsing state after the updates from calling
   *  this `Parser`'s parsing function have been applied.
   * @public
   * @method
   */
  public execute(state: ParseContext): ParseContext {
    return this.executeInternal(state, true, true);
  }

  /**
   * @summary Run this parser, reusing a prior result at this index when safe.
   * @description
   * Packrat memoization is keyed by parser identity, token index, and a
   * snapshot of context that can change which alternative is accepted
   * (`currentType`, `justParsedPluralLiteral`, and the sizes of the
   * identifier / syntax-token / enum-item collections). Hits return a
   * shallow copy so `optional()` can `delete result.error` without
   * corrupting the table. Callbacks still run on a hit: `NamedType` sets
   * `currentType` so the following `Value` can choose a type-specific
   * alternative, `Literal` sets `justParsedPluralLiteral`, and module /
   * assignment callbacks update the shared identifier tables.
   *
   * EOF and already-errored states are not cached: those paths return the
   * caller's `cst` rather than a production of this parser.
   *
   * @param {ParseContext} state The starting state.
   * @param {boolean} eofIsError Whether reading past the last token is an error.
   * @param {boolean} runCallbacks Whether to fire `callbackMap` on success.
   * @returns {ParseContext} The state after this parser runs (or a memo hit).
   * @protected
   * @method
   */
  protected executeInternal(
    state: ParseContext,
    eofIsError: boolean,
    runCallbacks: boolean
  ): ParseContext {
    if (state.error) {
      return state;
    }
    if (state.index >= state.tokens.length) {
      return eofIsError
        ? {
            ...state,
            error: true,
          }
        : {
            ...state,
          };
    }
    const startIndex = state.index;
    const applyCallbacks = (result: ParseContext): ParseContext => {
      if (
        runCallbacks &&
        !result.error &&
        result.callbackMap.has(result.cst.type)
      ) {
        result.callbackMap.get(result.cst.type)!(result);
      }
      return result;
    };
    const run = (): ParseContext => applyCallbacks(this.executor(state));
    if (this.packrat && state.memo) {
      const fingerprint = memoFingerprint(state);
      if (fingerprint !== undefined) {
        const cached = lookupMemo(this, state, fingerprint);
        if (cached) {
          return applyCallbacks(cached);
        }
        const ret = run();
        storeMemo(this, state, startIndex, fingerprint, ret);
        return ret;
      }
    }
    return run();
  }
}
