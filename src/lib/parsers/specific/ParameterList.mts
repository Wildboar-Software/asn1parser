import {
  assert,
  commaDelimitedList,
  literal,
  recursiveParser,
  whitespaceTolerantSequenceOf,
} from '../generic/index.mjs';
import * as parserFor from '../specific/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';

/**
 * `ParameterList ::= "{" Parameter "," + "}"`
 */
export const ParameterList: Parser = recursiveParser(
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
export default ParameterList;
