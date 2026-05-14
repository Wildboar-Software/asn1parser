import {
  literal,
  optional,
  recursiveParser,
  sequenceOf,
  whitespace,
} from '../generic/index.js';
import * as parserFor from '../specific/index.js';
import type Parser from '../../Parser.js';
import ProductionType from '../../ProductionType.js';

/**
 * `XMLChoiceValue ::= "<" & identifier ">" XMLValue "</" & identifier ">"`
 */
export default recursiveParser(
  (): Parser =>
    sequenceOf(ProductionType.XMLChoiceValue, [
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
