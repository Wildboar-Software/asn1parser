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
 * `EmptyElementEnumerated ::= "<" & identifier "/>"`
 */
export const EmptyElementEnumerated: Parser = recursiveParser(
  (): Parser =>
    sequenceOf(ProductionType.EmptyElementEnumerated, [
      literal(ProductionType.lessThan),
      literal(ProductionType.identifier),
      optional(whitespace),
      literal(ProductionType.forwardSlash),
      literal(ProductionType.greaterThan),
    ])
);
export default EmptyElementEnumerated;
