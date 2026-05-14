import {
  literal,
  optional,
  recursiveParser,
  sequenceOf,
  whitespace,
} from '../generic/index.mjs';
import * as parserFor from '../specific/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';

/**
 * `XMLNamedValue ::= "<" & identifier ">" XMLValue "</" & identifier ">"`
 */
export default recursiveParser(
  (): Parser =>
    sequenceOf(ProductionType.XMLNamedValue, [
      literal(ProductionType.lessThan),
      literal(ProductionType.identifier),
      optional(whitespace),
      literal(ProductionType.greaterThan),
      optional(whitespace),
      parserFor.XMLValue,
      optional(whitespace),
      literal(ProductionType.lessThan),
      literal(ProductionType.forwardSlash),
      literal(ProductionType.identifier),
      optional(whitespace),
      literal(ProductionType.greaterThan),
    ])
);
