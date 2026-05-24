import {
  choiceOf,
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
 * `XMLDelimitedItem ::=
 *      "<" & NonParameterizedTypeName ">" XMLValue "</" & NonParameterizedTypeName ">"
 *      | "<" & identifier ">" XMLValue "</" & identifier ">"`
 */
export const XMLDelimitedItem: Parser = recursiveParser(
  (): Parser =>
    choiceOf([
      sequenceOf(ProductionType.XMLDelimitedItem, [
        literal(ProductionType.lessThan),
        parserFor.NonParameterizedTypeName,
        optional(whitespace),
        literal(ProductionType.greaterThan),
        optional(whitespace),
        parserFor.XMLValue,
        optional(whitespace),
        literal(ProductionType.lessThan),
        literal(ProductionType.forwardSlash),
        parserFor.NonParameterizedTypeName,
        optional(whitespace),
        literal(ProductionType.greaterThan),
      ]),
    ])
);
export default XMLDelimitedItem;
