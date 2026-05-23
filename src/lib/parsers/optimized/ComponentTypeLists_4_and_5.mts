import { literal, optional, whitespace } from '../generic/index.mjs';
import * as parserFor from '../specific/index.mjs';
import Parser from '../../Parser.mjs';
import Production from '../../Production.mjs';
import ProductionType from '../../ProductionType.mjs';
import type ParseContext from '../../interfaces/ParseContext.mjs';
import ASN1SyntaxError from '../../errors/ASN1SyntaxError.mjs';

/**
 * @summary Efficient parser for a alternatives 4 and 5 of a `ComponentTypeList`
 * @description
 * This parser parses a `ComponentTypeList` that starts with an ellipsis
 * (extensions). This parser improve efficiently primarily by not re-parsing the
 * `ExtensionAdditions`.
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
  (): string => 'ComponentTypeLists (Starting with ExtensionAndException)',
  (state: ParseContext): ParseContext => {
    const results: ParseContext[] = [];

    const mandatoryProductions: Parser[] = [
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
    let nextState: ParseContext = state;
    for (let i: number = 0; i < mandatoryProductions.length; i++) {
      nextState = mandatoryProductions[i].execute(nextState);
      if (nextState.error) {
        return {
          ...nextState,
          syntaxErrors: {
            ...nextState.syntaxErrors,
            [state.cst.location.startIndex]: new ASN1SyntaxError(
              new Production(
                ProductionType.SYNTAX_ERROR,
                results.map((r) => r.cst)
              ),
              'F0A7A81A-5324-47C2-A403-DAD83E0512E8'
            ),
          },
        };
      }

      // Each one of these productions should have children or be absent.
      nextState.cst.children.length && results.push(nextState);
    }

    const ws1: ParseContext = optional(whitespace).execute(nextState);
    /**
     * `ExtensionEndMarker` only differs from `OptionalExtensionMarker`
     * in that `ExtensionEndMarker` is mandatory, and
     * `OptionalExtensionMarker` is optional.
     */
    const eem: ParseContext = parserFor.ExtensionEndMarker.execute(ws1);
    if (eem.error) {
      // If an ExtensionEndMarker could not be read, it must have been Option #5.
      return {
        ...ws1,
        cst: new Production(
          ProductionType.ComponentTypeLists,
          results.map((r) => r.cst)
        ),
      };
    }
    ws1.cst.children.length && results.push(ws1);
    results.push(eem);

    const ws2: ParseContext = optional(whitespace).execute(eem);
    const comma: ParseContext = literal(ProductionType.comma).execute(ws2);
    if (comma.error) {
      // If a comma could not be read, it must have been Option #5.
      return {
        ...eem,
        cst: new Production(
          ProductionType.ComponentTypeLists,
          results.map((r) => r.cst)
        ),
      };
    }
    ws2.cst.children.length && results.push(ws2);
    results.push(comma);

    // Otherwise, it must be Option #4.
    const ws3: ParseContext = optional(whitespace).execute(comma);
    const rctl: ParseContext = parserFor.RootComponentTypeList.execute(ws3);
    if (rctl.error) {
      return {
        ...rctl,
        syntaxErrors: {
          ...rctl.syntaxErrors,
          [results[0].cst.location.startIndex]: new ASN1SyntaxError(
            new Production(
              ProductionType.SYNTAX_ERROR,
              results.map((r) => r.cst)
            ),
            '283906A4-E7D2-4CB1-B168-BC7D55F22238'
          ),
        },
      };
    }
    ws3.cst.children.length && results.push(ws3);
    results.push(rctl);

    return {
      ...rctl,
      cst: new Production(
        ProductionType.ComponentTypeLists,
        results.map((r) => r.cst)
      ),
    };
  }
);
