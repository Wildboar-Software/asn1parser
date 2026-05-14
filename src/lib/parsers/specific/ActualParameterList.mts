import {
  commaDelimitedList,
  literal,
  recursiveParser,
  whitespaceTolerantSequenceOf,
} from '../generic/index.js';
import * as parserFor from '../specific/index.js';
import type Parser from '../../Parser.js';
import ProductionType from '../../ProductionType.js';

/**
 * `ActualParameterList ::= "{" ActualParameter "," + "}"`
 */
export default recursiveParser(
  (): Parser =>
    whitespaceTolerantSequenceOf(ProductionType.ActualParameterList, [
      literal(ProductionType.curlyOpening),
      commaDelimitedList(
        ProductionType.ActualParameterList,
        parserFor.ActualParameter
      ), // FIXME:
      literal(ProductionType.curlyClosing),
    ])
);
