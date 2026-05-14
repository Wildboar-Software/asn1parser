import { choiceOf, literal, recursiveParser } from '../generic/index.js';
import * as parserFor from '../specific/index.js';
import type Parser from '../../Parser.js';
import ProductionType from '../../ProductionType.js';

/**
 * `XMLOctetStringValue ::= XMLTypedValue | xmlhstring`
 */
export default recursiveParser(
  (): Parser =>
    choiceOf(
      [parserFor.XMLTypedValue, literal(ProductionType.xmlhstring)],
      ProductionType.XMLOctetStringValue
    )
);
