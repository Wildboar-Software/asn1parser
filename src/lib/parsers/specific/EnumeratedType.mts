import {
  assert,
  literal,
  recursiveParser,
  whitespaceTolerantSequenceOf,
} from '../generic/index.js';
import * as parserFor from '../specific/index.js';
import type Parser from '../../Parser.js';
import ProductionType from '../../ProductionType.js';

/**
 * `EnumeratedType ::= ENUMERATED "{" Enumerations "}"`
 */
export default recursiveParser(
  (): Parser =>
    whitespaceTolerantSequenceOf(ProductionType.EnumeratedType, [
      literal(ProductionType._ENUMERATED),
      assert(
        literal(ProductionType.curlyOpening),
        literal(ProductionType.curlyClosing),
        'DAEF5BC6-7EFE-4667-AA1A-BB8983AD85C0'
      ),
      parserFor.Enumerations,
      assert(
        literal(ProductionType.curlyClosing),
        literal(ProductionType.curlyClosing),
        'DAEF5BC6-7EFE-4667-AA1A-BB8983AD85C0'
      ),
    ])
);
