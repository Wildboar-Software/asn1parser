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
 * `SetOfType ::= SET OF Type | SET OF NamedType`
 */
export const SetOfType: Parser = recursiveParser(
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
export default SetOfType;
