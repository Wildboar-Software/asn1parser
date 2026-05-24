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
 * `PermittedAlphabet ::= FROM Constraint`
 */
export const PermittedAlphabet: Parser = recursiveParser(
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
export default PermittedAlphabet;
