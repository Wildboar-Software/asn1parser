import {
  assert,
  commaDelimitedList,
  literal,
  recursiveParser,
  whitespaceTolerantSequenceOf,
} from '../generic/index.js';
import * as parserFor from '../specific/index.js';
import type Parser from '../../Parser.js';
import ProductionType from '../../ProductionType.js';

/**
 * `ParameterList ::= "{" Parameter "," + "}"`
 */
export default recursiveParser(
  (): Parser =>
    whitespaceTolerantSequenceOf(ProductionType.ParameterList, [
      literal(ProductionType.curlyOpening),
      commaDelimitedList(ProductionType.ParameterList, parserFor.Parameter),
      assert(
        literal(ProductionType.curlyClosing),
        literal(ProductionType.assignment),
        '5B58F24A-6E8D-4303-BD61-A80157AEF765'
      ),
    ])
);
