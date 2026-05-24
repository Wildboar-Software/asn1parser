import {
  assert,
  literal,
  recursiveParser,
  whitespaceTolerantSequenceOf,
} from '../generic/index.mjs';
import * as parserFor from '../specific/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';

/**
 * `EnumeratedType ::= ENUMERATED "{" Enumerations "}"`
 */
export const EnumeratedType: Parser = recursiveParser(
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
export default EnumeratedType;
