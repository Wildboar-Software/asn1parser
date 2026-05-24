import {
  anything,
  assert,
  literal,
  recursiveParser,
  whitespaceTolerantSequenceOf,
} from '../generic/index.mjs';
import * as parserFor from '../specific/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';

/**
 * `PatternConstraint ::= PATTERN Value`
 */
export const PatternConstraint: Parser = recursiveParser(
  (): Parser =>
    whitespaceTolerantSequenceOf(ProductionType.PatternConstraint, [
      literal(ProductionType._PATTERN),
      assert(parserFor.Value, anything, '84478A4B-ECE2-47C3-A938-4E769896E206'),
    ])
);
export default PatternConstraint;
