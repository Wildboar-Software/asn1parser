import {
  choiceOf,
  recursiveParser,
  aliasFor,
  whitespaceTolerantSequenceOf,
} from '../generic/index.mjs';
import * as parserFor from '../specific/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';

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
