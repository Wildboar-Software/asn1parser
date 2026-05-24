import { choiceOf, literal, recursiveParser } from '../generic/index.mjs';
import * as parserFor from '../specific/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';

/**
 * `XMLOpenTypeFieldVal ::= XMLTypedValue | xmlhstring`
 */
export const XMLOpenTypeFieldVal: Parser = recursiveParser(
  (): Parser =>
    choiceOf(
      [parserFor.XMLTypedValue, literal(ProductionType.xmlhstring)],
      ProductionType.XMLOpenTypeFieldVal
    )
);
export default XMLOpenTypeFieldVal;
