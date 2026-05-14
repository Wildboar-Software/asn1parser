import {
  aliasFor,
  assert,
  choiceOf,
  literal,
  recursiveParser,
  whitespace,
  whitespaceTolerantList,
  whitespaceTolerantSequenceOf,
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
 * Except `SubtypeElements` has been ruled out.
 */
const Elements = recursiveParser(
  (): Parser =>
    choiceOf([
      aliasFor(ProductionType.Elements, parserFor.ObjectSetElements),
      whitespaceTolerantSequenceOf(ProductionType.Elements, [
        literal(ProductionType.parenthesisOpening),
        ElementSetSpec, // eslint-disable-line
        assert(
          literal(ProductionType.parenthesisClosing),
          literal(ProductionType.parenthesisClosing),
          '3D7F47D0-DA02-419B-9964-877C157FBC27'
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
    whitespaceTolerantSequenceOf(ProductionType.Exclusions, [
      literal(ProductionType._EXCEPT),
      Elements,
    ])
);

/**
 * @summary `ElementSetSpec` parser that only parses `ObjectSetElements`.
 * @description
 * When parsing object sets, the `Elements` productions within the
 * `ElementSetSpec` may only take on the `ObjectSetElements` and
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
      whitespaceTolerantSequenceOf(ProductionType.ElementSetSpec, [
        literal(ProductionType._ALL),
        assert(
          Exclusions,
          choiceOf([
            literal(ProductionType.comma),
            literal(ProductionType.curlyClosing),
            literal(ProductionType.parenthesisClosing),
          ]),
          '7D2DB8CE-68F2-4514-BC36-A795046E3524'
        ),
      ]),
      aliasFor(ProductionType.ElementSetSpec, Unions),
    ])
);

export default ElementSetSpec;
