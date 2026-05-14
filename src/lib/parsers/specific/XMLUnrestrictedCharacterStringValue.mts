import { literal, recursiveParser } from '../generic/index.js';
import type Parser from '../../Parser.js';
import ProductionType from '../../ProductionType.js';

/**
 * `XMLUnrestrictedCharacterStringValue ::= XMLSequenceValue`
 */
export default recursiveParser(
  (): Parser =>
    literal(
      ProductionType.XMLSequenceValue,
      ProductionType.XMLUnrestrictedCharacterStringValue
    )
);
