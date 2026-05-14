import { choiceOf, recursiveParser } from '../generic/index.mjs';
import * as parserFor from '../specific/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';

/**
 * `XMLObjectClassFieldValue ::= XMLOpenTypeFieldVal | XMLFixedTypeFieldVal`
 */
export default recursiveParser(
  (): Parser =>
    choiceOf(
      [parserFor.XMLOpenTypeFieldVal, parserFor.XMLFixedTypeFieldVal],
      ProductionType.XMLObjectClassFieldValue
    )
);
