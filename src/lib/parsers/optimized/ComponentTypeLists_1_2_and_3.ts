import { literal, optional, whitespace } from '../generic/index.js';
import * as parserFor from '../specific/index.js';
import Parser from '../../Parser.js';
import Production from '../../Production.js';
import ProductionType from '../../ProductionType.js';
import type ParseContext from '../../interfaces/ParseContext.js';
import ASN1SyntaxError from '../../errors/ASN1SyntaxError.js';

/**
 * @summary Efficient parser for the first three alternatives of
 *  `ComponentTypeLists`
 * @description
 * This parser parses the first three alternatives of `ComponentTypeLists`
 * without re-parsing `RootComponentTypeList` every time.
 *
 * ### ASN.1 ABNF Definition
 *
 * ```abnf
 * ComponentTypeLists ::=
 *   RootComponentTypeList
 *   | RootComponentTypeList "," ExtensionAndException ExtensionAdditions OptionalExtensionMarker
 *   | RootComponentTypeList "," ExtensionAndException ExtensionAdditions ExtensionEndMarker  "," RootComponentTypeList
 *   | ExtensionAndException ExtensionAdditions ExensionEndMarker "," RootComponentTypeList
 *   | ExtensionAndException ExtensionAdditions OptionalExtensionMarker
 * ```
 *
 * @constant {Parser}
 */
export default new Parser(
  (): string => 'ComponentTypeLists (Starting with RootComponentTypeList)',
  (state: ParseContext): ParseContext => {
    const results: ParseContext[] = [];

    const rctl: ParseContext = parserFor.RootComponentTypeList.execute(state);
    if (rctl.error) {
      return rctl;
    }
    results.push(rctl);

    const ws1: ParseContext = optional(whitespace).execute(rctl);
    const comma1: ParseContext = literal(ProductionType.comma).execute(ws1);
    if (comma1.error) {
      // If there was no comma, it must have been Option #1.
      return {
        ...rctl,
        cst: new Production(
          ProductionType.ComponentTypeLists,
          results.map((r) => r.cst)
        ),
      };
    }
    results.push(ws1);
    results.push(comma1);

    const commonProductions: Parser[] = [
      optional(whitespace),
      parserFor.ExtensionAndException,
      optional(whitespace),
      parserFor.ExtensionAdditions,
      /**
       * Whitespace should not come at the end of this list, because
       * this parser could terminate without relinquishing the
       * trailing whitespace for the parent parser to digest.
       */
      // optional(whitespace),
    ];
    let nextState: ParseContext = comma1;
    for (let i: number = 0; i < commonProductions.length; i++) {
      nextState = commonProductions[i].execute(nextState);
      if (nextState.error) {
        return {
          ...nextState,
          syntaxErrors: {
            ...nextState.syntaxErrors,
            [results[0].cst.location.startIndex]: new ASN1SyntaxError(
              new Production(
                ProductionType.SYNTAX_ERROR,
                results.map((r) => r.cst)
              ),
              'FDE10778-BB0D-4046-BAE6-9A1B377823A3'
            ),
          },
        };
      }
      results.push(nextState);
    }

    const ws2 = optional(whitespace).execute(nextState);
    /**
     * `ExtensionEndMarker` only differs from `OptionalExtensionMarker`
     * in that `ExtensionEndMarker` is mandatory, and
     * `OptionalExtensionMarker` is optional.
     */
    const eem: ParseContext = parserFor.ExtensionEndMarker.execute(ws2);
    if (eem.error) {
      // If an ExtensionEndMarker could not be read, it must have been Option #2.
      results.push({
        ...eem,
        error: undefined,
        cst: new Production(ProductionType.OptionalExtensionMarker, []),
      });
      return {
        ...eem,
        error: undefined,
        cst: new Production(
          ProductionType.ComponentTypeLists,
          results.map((r) => r.cst)
        ),
      };
    }
    results.push(ws2);
    results.push(eem);

    const ws3 = optional(whitespace).execute(eem);
    const comma2: ParseContext = literal(ProductionType.comma).execute(ws3);
    if (comma2.error) {
      return {
        ...eem,
        cst: new Production(
          ProductionType.ComponentTypeLists,
          results.map((r) => r.cst)
        ),
      };
    }
    results.push(ws3);
    results.push(comma2);

    // Otherwise, it must be Option #3
    const ws4 = optional(whitespace).execute(comma2);
    const rctl2: ParseContext = parserFor.RootComponentTypeList.execute(ws4);
    if (rctl2.error) {
      return {
        ...rctl2,
        syntaxErrors: {
          ...rctl2.syntaxErrors,
          [results[0].cst.location.startIndex]: new ASN1SyntaxError(
            new Production(
              ProductionType.SYNTAX_ERROR,
              results.map((r) => r.cst)
            ),
            'E14B01B4-B5AD-40B7-95E0-E7F02B765A83'
          ),
        },
      };
    }
    results.push(ws4);
    results.push(rctl2);
    return {
      ...rctl2,
      cst: new Production(
        ProductionType.ComponentTypeLists,
        results.map((r) => r.cst)
      ),
    };
  }
);
