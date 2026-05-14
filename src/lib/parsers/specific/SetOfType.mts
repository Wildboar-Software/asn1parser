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
 * `SetOfType ::= SET OF Type | SET OF NamedType`
 */
export default recursiveParser(
  (): Parser =>
    whitespaceTolerantSequenceOf(ProductionType.SetOfType, [
      literal(ProductionType._SET),
      literal(ProductionType._OF),
      assert(
        choiceOf([parserFor.Type, parserFor.NamedType]),
        anything,
        'F5F9FEA7-2078-4D8E-8DBA-C0DE65BBA008'
      ),
    ])
);
