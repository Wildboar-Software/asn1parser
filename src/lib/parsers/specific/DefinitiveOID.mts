import {
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
