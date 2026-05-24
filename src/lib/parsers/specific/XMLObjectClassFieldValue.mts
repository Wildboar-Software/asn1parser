import { choiceOf, recursiveParser } from '../generic/index.mjs';
import * as parserFor from '../specific/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';

/**
 * `XMLObjectClassFieldValue ::= XMLOpenTypeFieldVal | XMLFixedTypeFieldVal`
 */
export const XMLObjectClassFieldValue: Parser = recursiveParser(
  (): Parser =>
    choiceOf(
      [parserFor.XMLOpenTypeFieldVal, parserFor.XMLFixedTypeFieldVal],
      ProductionType.XMLObjectClassFieldValue
    )
);
export default XMLObjectClassFieldValue;
