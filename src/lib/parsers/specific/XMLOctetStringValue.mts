import { choiceOf, literal, recursiveParser } from '../generic/index.mjs';
import * as parserFor from '../specific/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';

/**
 * `XMLOctetStringValue ::= XMLTypedValue | xmlhstring`
 */
export const XMLOctetStringValue: Parser = recursiveParser(
  (): Parser =>
    choiceOf(
      [parserFor.XMLTypedValue, literal(ProductionType.xmlhstring)],
      ProductionType.XMLOctetStringValue
    )
);
export default XMLOctetStringValue;
