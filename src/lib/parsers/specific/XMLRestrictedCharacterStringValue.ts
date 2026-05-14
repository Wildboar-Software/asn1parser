import { literal, recursiveParser } from '../generic/index.js';
import type Parser from '../../Parser.js';
import ProductionType from '../../ProductionType.js';

/**
 * `XMLRestrictedCharacterStringValue ::= xmlcstring`
 */
export default recursiveParser(
  (): Parser =>
    literal(
      ProductionType.xmlcstring,
      ProductionType.XMLRestrictedCharacterStringValue
    )
);
