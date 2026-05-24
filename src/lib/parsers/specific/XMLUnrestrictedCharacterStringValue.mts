import { literal, recursiveParser } from '../generic/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';

/**
 * `XMLUnrestrictedCharacterStringValue ::= XMLSequenceValue`
 */
export const XMLUnrestrictedCharacterStringValue: Parser = recursiveParser(
  (): Parser =>
    literal(
      ProductionType.XMLSequenceValue,
      ProductionType.XMLUnrestrictedCharacterStringValue
    )
);
export default XMLUnrestrictedCharacterStringValue;
