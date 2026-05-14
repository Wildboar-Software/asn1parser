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
 * `EmptyElementBoolean ::= "<" & "true" "/>" | "<" & "false" "/>"`
 */
export default recursiveParser(
  (): Parser =>
    sequenceOf(ProductionType.EmptyElementBoolean, [
      literal(ProductionType.lessThan),
      choiceOf([literal(ProductionType._true), literal(ProductionType._false)]),
      optional(whitespace),
      literal(ProductionType.forwardSlash),
      literal(ProductionType.greaterThan),
    ])
);
