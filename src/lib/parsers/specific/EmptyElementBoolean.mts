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
 * `EmptyElementBoolean ::= "<" & "true" "/>" | "<" & "false" "/>"`
 */
export const EmptyElementBoolean: Parser = recursiveParser(
  (): Parser =>
    sequenceOf(ProductionType.EmptyElementBoolean, [
      literal(ProductionType.lessThan),
      choiceOf([literal(ProductionType._true), literal(ProductionType._false)]),
      optional(whitespace),
      literal(ProductionType.forwardSlash),
      literal(ProductionType.greaterThan),
    ])
);
export default EmptyElementBoolean;
