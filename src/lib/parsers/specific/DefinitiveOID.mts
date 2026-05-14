import {
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
 * `DefinitiveOID ::= "{" DefinitiveObjIdComponentList "}"`
 */
export default recursiveParser(
  (): Parser =>
    whitespaceTolerantSequenceOf(ProductionType.DefinitiveOID, [
      literal(ProductionType.curlyOpening),
      parserFor.DefinitiveObjIdComponentList,
      assert(
        literal(ProductionType.curlyClosing),
        choiceOf([parserFor.IRIValue, literal(ProductionType._DEFINITIONS)]),
        'A990220A-529F-427D-9E18-45BFBE2EDC85'
      ),
    ])
);
