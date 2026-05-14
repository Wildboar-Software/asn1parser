import {
  choiceOf,
  literal,
  optional,
  recursiveParser,
  sequenceOf,
  whitespace,
} from '../generic/index.js';
import type Parser from '../../Parser.js';
import ProductionType from '../../ProductionType.js';

/**
 * `EmptyElementReal ::= "<" & PLUS-INFINITY "/>" | "<" & MINUS-INFINITY "/>" | "<" & NOT-A-NUMBER "/>"`
 */
export default recursiveParser(
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
