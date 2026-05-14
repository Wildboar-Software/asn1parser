import { choiceOf, recursiveParser } from '../generic/index.js';
import * as parserFor from '../specific/index.js';
import type Parser from '../../Parser.js';
import ProductionType from '../../ProductionType.js';

/**
 * `XMLValue ::= XMLBuiltinValue | XMLObjectClassFieldValue`
 */
export default recursiveParser(
  (): Parser =>
    choiceOf(
      [parserFor.XMLBuiltinValue, parserFor.XMLObjectClassFieldValue],
      ProductionType.XMLValue
    )
);
