import {
  anything,
  assert,
  choiceOf,
  literal,
  recursiveParser,
  whitespaceTolerantSequenceOf,
} from '../generic/index.mjs';
import * as parserFor from '../specific/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';

/**
 * `SequenceOfType ::= SEQUENCE OF Type | SEQUENCE OF NamedType`
 */
export const SequenceOfType: Parser = recursiveParser(
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
export default SequenceOfType;
