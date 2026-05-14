import { literal, recursiveParser } from '../generic/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';

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
