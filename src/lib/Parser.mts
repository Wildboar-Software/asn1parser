import type ParseContext from './interfaces/ParseContext.mjs';
import Production from './Production.mjs';
import consoleLogger from './loggers/console.mjs';
import ProductionType from './ProductionType.mjs';
import onDidParseAssignment from './parsers/callbacks/Assignment.mjs';
import onDidParseObjectClassAssignment from './parsers/callbacks/ObjectClassAssignment.mjs';
import onDidParseSymbol from './parsers/callbacks/Symbol.mjs';
import onDidParseEnumerationItem from './parsers/callbacks/EnumerationItem.mjs';
import onDidParseNamedNumber from './parsers/callbacks/NamedNumber.mjs';
import onDidParseModuleDefinition from './parsers/callbacks/ModuleDefinition.mjs';
import onDidParseNamedType from './parsers/callbacks/NamedType.mjs';
import onDidParseValue from './parsers/callbacks/Value.mjs';
import onDidParseLiteral from './parsers/callbacks/Literal.mjs';

/**
 * @summary A class grouping the code and data for a parser.
 * @class
 */
export default class Parser {
  /**
   * @param name A function that returns the name of the `Parser`
   * @param executor A function that actually parses.
   * @public
   * @constructor
   */
  constructor(
    readonly name: () => string,
    readonly executor: (state: ParseContext) => ParseContext
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
    return this.executor({
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
    });
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
    if (state.error) {
      return state;
    }
    if (state.index >= state.tokens.length) {
      return {
        ...state,
        error: true,
      };
    }
    const ret = this.executor(state);
    if (!ret.error && state.callbackMap.has(ret.cst.type)) {
      ret.callbackMap.get(ret.cst.type)!(ret);
    }
    return ret;
  }
}
