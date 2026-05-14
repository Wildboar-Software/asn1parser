import {
  anything,
  assert,
  literal,
  recursiveParser,
  whitespaceTolerantSequenceOf,
} from '../generic/index.js';
import * as parserFor from '../specific/index.js';
import type Parser from '../../Parser.js';
import ProductionType from '../../ProductionType.js';

/**
 * `PatternConstraint ::= PATTERN Value`
 */
export default recursiveParser(
  (): Parser =>
    whitespaceTolerantSequenceOf(ProductionType.PatternConstraint, [
      literal(ProductionType._PATTERN),
      assert(parserFor.Value, anything, '84478A4B-ECE2-47C3-A938-4E769896E206'),
    ])
);
