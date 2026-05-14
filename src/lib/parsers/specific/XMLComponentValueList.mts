import {
  choiceOf,
  recursiveParser,
  aliasFor,
  whitespaceTolerantSequenceOf,
} from '../generic/index.js';
import * as parserFor from '../specific/index.js';
import type Parser from '../../Parser.js';
import ProductionType from '../../ProductionType.js';

/**
 * `XMLComponentValueList ::= XMLNamedValue | XMLComponentValueList XMLNamedValue`
 */
export default recursiveParser(
  (): Parser =>
    choiceOf([
      aliasFor(ProductionType.XMLComponentValueList, parserFor.XMLNamedValue),
      whitespaceTolerantSequenceOf(ProductionType.XMLComponentValueList, [
        parserFor.XMLComponentValueList,
        parserFor.XMLNamedValue,
      ]),
    ])
);
