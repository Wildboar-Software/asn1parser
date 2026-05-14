import {
  literal,
  optional,
  recursiveParser,
  sequenceOf,
  whitespace,
} from '../generic/index.js';
import type Parser from '../../Parser.js';
import ProductionType from '../../ProductionType.js';

/**
 * `EmptyElementInteger ::= "<" & identifier "/>"`
 */
export default recursiveParser(
  (): Parser =>
    sequenceOf(ProductionType.EmptyElementInteger, [
      literal(ProductionType.lessThan),
      literal(ProductionType.identifier),
      optional(whitespace),
      literal(ProductionType.forwardSlash),
      literal(ProductionType.greaterThan),
    ])
);
