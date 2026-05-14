import { literal, whitespace } from '../generic/index.mjs';
import * as parserFor from '../specific/index.mjs';
import Parser from '../../Parser.mjs';
import Production from '../../Production.mjs';
import ProductionType from '../../ProductionType.mjs';
import type ParseContext from '../../interfaces/ParseContext.mjs';
import ASN1SyntaxError from '../../errors/ASN1SyntaxError.mjs';
import Value from './Value_listens_to_currentType.mjs';

/**
 * @summary Efficient parser for a `ComponentType` that starts with a
 *  `NamedType`
 * @description
 * This parses a `ComponentType` that starts with a `NamedType` without
 * re-parsing the `NamedType` when it attempts to read the `DEFAULT Value` or
 * `OPTIONAL` that can appear after the `NamedType`.
 *
 * ### ASN.1 ABNF Definition
 *
 * ```abnf
 * ComponentType ::=
 *   NamedType
 *   | NamedType OPTIONAL
 *   | NamedType DEFAULT Value
 *   | COMPONENTS OF Type
 * ```
 * @constant {Parser}
 */
export default new Parser(
  (): string => 'ComponentType starting with a NamedType',
  (state: ParseContext): ParseContext => {
    const results: ParseContext[] = [];

    const nt: ParseContext = parserFor.NamedType.execute(state);
    if (nt.error) {
      return nt;
    }
    results.push(nt);

    const ws1: ParseContext = whitespace.execute(nt);
    if (ws1.error) {
      return {
        ...nt,
        cst: new Production(ProductionType.ComponentType, [nt.cst]),
      };
    }
    const optionalLiteral: ParseContext = literal(
      ProductionType._OPTIONAL
    ).execute(ws1);
    if (!optionalLiteral.error) {
      results.push(ws1);
      results.push(optionalLiteral);
      return {
        ...optionalLiteral,
        cst: new Production(
          ProductionType.ComponentType,
          results.map((r) => r.cst)
        ),
      };
    }

    const defaultLiteral: ParseContext = literal(
      ProductionType._DEFAULT
    ).execute(ws1);
    if (defaultLiteral.error) {
      // If it was neither OPTIONAL, nor DEFAULT, it must be just `NamedType`.
      return {
        ...nt,
        cst: new Production(ProductionType.ComponentType, [nt.cst]),
      };
    }
    results.push(ws1);
    results.push(defaultLiteral);

    const ws2: ParseContext = whitespace.execute(defaultLiteral);
    if (ws2.error) {
      return ws2;
    }
    results.push(ws2);

    const value: ParseContext = Value.execute(ws2);
    if (value.error) {
      return {
        ...value,
        syntaxErrors: {
          ...value.syntaxErrors,
          [results[0].cst.location.startIndex]: new ASN1SyntaxError(
            new Production(
              ProductionType.SYNTAX_ERROR,
              results.map((r) => r.cst)
            ),
            '2662AB6F-3A52-4467-9E26-44A672096063'
          ),
        },
      };
    }
    results.push(value);
    return {
      ...value,
      cst: new Production(
        ProductionType.ComponentType,
        results.map((r) => r.cst)
      ),
    };
  }
);
