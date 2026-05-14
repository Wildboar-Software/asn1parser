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
 * `EmptyElementEnumerated ::= "<" & identifier "/>"`
 */
export default recursiveParser(
  (): Parser =>
    sequenceOf(ProductionType.EmptyElementEnumerated, [
      literal(ProductionType.lessThan),
      literal(ProductionType.identifier),
      optional(whitespace),
      literal(ProductionType.forwardSlash),
      literal(ProductionType.greaterThan),
    ])
);
