import {
  literal,
  optional,
  recursiveParser,
  repeatable,
  sequenceOf,
  whitespace,
} from '../generic/index.js';
import type Parser from '../../Parser.js';
import ProductionType from '../../ProductionType.js';

/**
 * `EmptyElementList ::= "<" & identifier "/>" | EmptyElementList "<" & identifier "/>"`
 */
export default recursiveParser(
  (): Parser =>
    repeatable(
      ProductionType.EmptyElementList,
      sequenceOf(ProductionType.EmptyElementList, [
        literal(ProductionType.lessThan),
        literal(ProductionType.identifier),
        optional(whitespace),
        literal(ProductionType.forwardSlash),
        literal(ProductionType.greaterThan),
      ])
    )
);
