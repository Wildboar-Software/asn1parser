import {
  anything,
  assert,
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
 * `XMLTypedValue ::=
 *      "<" & NonParameterizedTypeName ">" XMLValue "</" & NonParameterizedTypeName ">"
 *      | "<" & NonParameterizedTypeName "/>"`
 */
export const XMLTypedValue: Parser = recursiveParser(
  (): Parser =>
    choiceOf([
      sequenceOf(ProductionType.XMLTypedValue, [
        literal(ProductionType.lessThan),
        assert(
          parserFor.NonParameterizedTypeName,
          literal(ProductionType.greaterThan),
          '7EBC054C-E6F5-4FA0-B445-8A341EC98FA5'
        ),
        optional(whitespace),
        literal(ProductionType.greaterThan),
        optional(whitespace),
        parserFor.XMLValue,
        optional(whitespace),
        assert(
          literal(ProductionType.lessThan),
          literal(ProductionType.greaterThan),
          '5EBD0099-E0C2-4ABA-AFD3-9A42BA528939'
        ),
        assert(
          literal(ProductionType.forwardSlash),
          literal(ProductionType.greaterThan),
          '797D1076-3681-4142-98D3-ED2D915F75AC'
        ),
        assert(
          parserFor.NonParameterizedTypeName,
          literal(ProductionType.greaterThan),
          '5F46F5DB-DD87-4584-ACE1-C1358C63ADA1'
        ),
        optional(whitespace),
        assert(
          literal(ProductionType.greaterThan),
          anything,
          '719B5463-60BD-4436-8A54-52AA61E387E6'
        ),
      ]),
      sequenceOf(ProductionType.XMLTypedValue, [
        literal(ProductionType.lessThan),
        assert(
          parserFor.NonParameterizedTypeName,
          literal(ProductionType.greaterThan),
          'B1333236-D6D0-40CB-9E10-F03874B00C5B'
        ),
        optional(whitespace),
        assert(
          literal(ProductionType.forwardSlash),
          literal(ProductionType.greaterThan),
          '0070E809-7240-4A5F-85B0-948EE11B2239'
        ),
        assert(
          literal(ProductionType.greaterThan),
          anything,
          '60D8BF05-DDD6-453F-9EDF-6B4FB62577BF'
        ),
      ]),
    ])
);
export default XMLTypedValue;
