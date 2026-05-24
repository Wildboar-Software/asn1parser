import {
  choiceOf,
  literal,
  optional,
  recursiveParser,
  sequenceOf,
  whitespace,
} from '../generic/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';

/**
 * `EmptyElementReal ::= "<" & PLUS-INFINITY "/>" | "<" & MINUS-INFINITY "/>" | "<" & NOT-A-NUMBER "/>"`
 */
export const EmptyElementReal: Parser = recursiveParser(
  (): Parser =>
    sequenceOf(ProductionType.EmptyElementReal, [
      literal(ProductionType.lessThan),
      choiceOf([
        literal(ProductionType._PLUS_INFINITY),
        literal(ProductionType._MINUS_INFINITY),
        literal(ProductionType._NOT_A_NUMBER),
      ]),
      optional(whitespace),
      literal(ProductionType.forwardSlash),
      literal(ProductionType.greaterThan),
    ])
);
export default EmptyElementReal;
