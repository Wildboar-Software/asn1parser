import {
  aliasFor,
  assert,
  choiceOf,
  literal,
  optional,
  recursiveParser,
  sequenceOf,
  whitespace,
  whitespaceTolerantList,
} from '../generic/index.js';
import * as parserFor from '../specific/index.js';
import Parser from '../../Parser.js';
import ProductionType from '../../ProductionType.js';
import type ParseContext from '../../interfaces/ParseContext.js';
import Production from '../../Production.js';

/**
 * `Intersections ::= IntersectionElements | IElems IntersectionMark IntersectionElements`
 *
 * This is, effectively:
 *
 * `Intersections ::= IntersectionElements IntersectionMark +`
 */
const Intersections = recursiveParser(
  (): Parser =>
    whitespaceTolerantList(
      ProductionType.Intersections,
      IntersectionElements, // eslint-disable-line
      parserFor.IntersectionMark
    )
);

/**
 * `Unions ::= Intersections | UElems UnionMark Intersections`
 *
 * And since `UElems ::= Unions`, this definition is effectively:
 *
 * `Unions ::= Intersections UnionMark +`
 */
const Unions = recursiveParser(
  (): Parser =>
    whitespaceTolerantList(
      ProductionType.Unions,
      Intersections,
      parserFor.UnionMark
    )
);

/**
 * `Elements ::=
 *     SubtypeElements
 * 	| ObjectSetElements
 * 	| "(" ElementSetSpec ")"`
 *
 * Except `ObjectSetElements` has been ruled out.
 */
const Elements = recursiveParser(
  (): Parser =>
    choiceOf([
      aliasFor(ProductionType.Elements, parserFor.SubtypeElements),
      sequenceOf(ProductionType.Elements, [
        literal(ProductionType.parenthesisOpening),
        optional(whitespace),
        ElementSetSpec, // eslint-disable-line
        optional(whitespace),
        assert(
          literal(ProductionType.parenthesisClosing),
          literal(ProductionType.parenthesisClosing),
          'C4B85A31-DFA6-4096-8F1B-BD1925934B2B'
        ),
      ]),
    ])
);

/**
 * `IntersectionElements ::= Elements | Elems Exclusions`
 *
 * And since `Elems` is just an alias for `Elements`:
 *
 * `IntersectionElements ::= Elements | Elems Exclusions
 */
const IntersectionElements = recursiveParser(
  (): Parser =>
    new Parser(
      (): string => 'IntersectionElements',
      (state: ParseContext): ParseContext => {
        const elements: ParseContext = Elements.execute(state);
        if (elements.error) {
          return elements;
        }

        const ws1: ParseContext = whitespace.execute(elements);
        if (ws1.error) {
          return {
            ...elements,
            cst: new Production(ProductionType.IntersectionElements, [
              elements.cst,
            ]),
          };
        }

        const exclusions: ParseContext = Exclusions.execute(ws1); // eslint-disable-line no-use-before-define
        if (exclusions.error) {
          return {
            ...elements,
            cst: new Production(ProductionType.IntersectionElements, [
              elements.cst,
            ]),
          };
        }

        return {
          ...exclusions,
          cst: new Production(ProductionType.IntersectionElements, [
            elements.cst,
            ws1.cst,
            exclusions.cst,
          ]),
        };
      }
    )
);

/**
 * `Exclusions ::= EXCEPT Elements`
 */
const Exclusions = recursiveParser(
  (): Parser =>
    sequenceOf(ProductionType.Exclusions, [
      literal(ProductionType._EXCEPT),
      optional(whitespace),
      Elements,
    ])
);

/**
 * @summary `ElementSetSpec` parser that only parses `SubtypeElements`.
 * @description
 * When parsing subtype constraints, the `Elements` productions within the
 * `ElementSetSpec` may only take on the `SubtypeElements` and
 * `ElementSetSpec` alternatives. This parser (indirectly) only parses these
 * variations of `Elements`.
 *
 * ### ASN.1 ABNF Definition
 *
 * `ElementSetSpec ::= Unions | ALL Exclusions`
 * @constant {Parser}
 */
const ElementSetSpec = recursiveParser(
  (): Parser =>
    choiceOf([
      sequenceOf(ProductionType.ElementSetSpec, [
        literal(ProductionType._ALL),
        whitespace,
        assert(
          Exclusions,
          choiceOf([
            literal(ProductionType.comma),
            literal(ProductionType.curlyClosing),
            literal(ProductionType.parenthesisClosing),
          ]),
          'B16D03A9-FD69-475A-99E5-A8239E14EA0B'
        ),
      ]),
      aliasFor(ProductionType.ElementSetSpec, Unions),
    ])
);

export default ElementSetSpec;
