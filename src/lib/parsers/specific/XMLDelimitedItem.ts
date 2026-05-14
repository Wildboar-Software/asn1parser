import {
  choiceOf,
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
 * `XMLDelimitedItem ::=
 *      "<" & NonParameterizedTypeName ">" XMLValue "</" & NonParameterizedTypeName ">"
 *      | "<" & identifier ">" XMLValue "</" & identifier ">"`
 */
export default recursiveParser(
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
