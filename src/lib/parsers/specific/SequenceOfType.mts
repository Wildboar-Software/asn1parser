import {
  anything,
  assert,
  choiceOf,
  literal,
  recursiveParser,
  whitespaceTolerantSequenceOf,
} from '../generic/index.js';
import * as parserFor from '../specific/index.js';
import type Parser from '../../Parser.js';
import ProductionType from '../../ProductionType.js';

/**
 * `SequenceOfType ::= SEQUENCE OF Type | SEQUENCE OF NamedType`
 */
export default recursiveParser(
  (): Parser =>
    whitespaceTolerantSequenceOf(ProductionType.SequenceOfType, [
      literal(ProductionType._SEQUENCE),
      literal(ProductionType._OF),
      assert(
        choiceOf([parserFor.Type, parserFor.NamedType]),
        anything,
        '327756EB-1F9B-49E9-A17A-1AA826EE87FF'
      ),
    ])
);
