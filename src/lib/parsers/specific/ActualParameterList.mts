import {
  commaDelimitedList,
  literal,
  recursiveParser,
  whitespaceTolerantSequenceOf,
} from '../generic/index.mjs';
import * as parserFor from '../specific/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';

/**
 * `ActualParameterList ::= "{" ActualParameter "," + "}"`
 */
export const ActualParameterList: Parser = recursiveParser(
  (): Parser =>
    whitespaceTolerantSequenceOf(ProductionType.ActualParameterList, [
      literal(ProductionType.curlyOpening),
      commaDelimitedList(
        ProductionType.ActualParameterList,
        parserFor.ActualParameter
      ),
      literal(ProductionType.curlyClosing),
    ])
);
export default ActualParameterList;
