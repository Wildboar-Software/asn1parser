import {
  anything,
  assert,
  choiceOf,
  literal,
  optional,
  recursiveParser,
  sequenceOf,
  whitespace,
  aliasFor,
} from '../generic/index.js';
import * as parserFor from '../specific/index.js';
import type Parser from '../../Parser.js';
import ProductionType from '../../ProductionType.js';

/**
 * `XMLValueOrEmpty ::= XMLValue | "<" & NonParameterizedTypeName "/>"`
 */
export default recursiveParser(
  (): Parser =>
    choiceOf([
      sequenceOf(ProductionType.XMLValueOrEmpty, [
        literal(ProductionType.lessThan),
        assert(
          parserFor.NonParameterizedTypeName,
          literal(ProductionType.greaterThan),
          '8584A0AE-454B-4386-B0F3-F44D28FFCADD'
        ),
        optional(whitespace),
        assert(
          literal(ProductionType.forwardSlash),
          literal(ProductionType.greaterThan),
          'B1907E8A-CF1F-4C40-887F-5C39544A3E82'
        ),
        assert(
          literal(ProductionType.greaterThan),
          anything,
          '2FE456C2-17B8-47D7-8994-58ECAE458412'
        ),
      ]),
      aliasFor(ProductionType.XMLValueOrEmpty, parserFor.XMLValue),
    ])
);
