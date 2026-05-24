import {
  literal,
  optional,
  recursiveParser,
  sequenceOf,
  whitespace,
} from '../generic/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';

/**
 * `EmptyElementInteger ::= "<" & identifier "/>"`
 */
export const EmptyElementInteger: Parser = recursiveParser(
  (): Parser =>
    sequenceOf(ProductionType.EmptyElementInteger, [
      literal(ProductionType.lessThan),
      literal(ProductionType.identifier),
      optional(whitespace),
      literal(ProductionType.forwardSlash),
      literal(ProductionType.greaterThan),
    ])
);
export default EmptyElementInteger;
