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
 * `PermittedAlphabet ::= FROM Constraint`
 */
export default recursiveParser(
  (): Parser =>
    whitespaceTolerantSequenceOf(ProductionType.PermittedAlphabet, [
      literal(ProductionType._FROM),
      assert(
        parserFor.Constraint,
        anything,
        '29A4605C-0EB7-4DDA-8D50-F4C60E102129'
      ),
    ])
);
