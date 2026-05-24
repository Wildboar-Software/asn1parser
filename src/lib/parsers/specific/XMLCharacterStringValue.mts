import { choiceOf, recursiveParser } from '../generic/index.mjs';
import * as parserFor from '../specific/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';

/**
 * `XMLCharacterStringValue ::= XMLRestrictedCharacterStringValue | XMLUnrestrictedCharacterStringValue`
 */
export const XMLCharacterStringValue: Parser = recursiveParser(
  (): Parser =>
    choiceOf(
      [
        parserFor.XMLRestrictedCharacterStringValue,
        parserFor.XMLUnrestrictedCharacterStringValue,
      ],
      ProductionType.XMLCharacterStringValue
    )
);
export default XMLCharacterStringValue;
