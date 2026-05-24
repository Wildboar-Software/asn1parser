import { choiceOf, recursiveParser } from '../generic/index.mjs';
import * as parserFor from '../specific/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';

/**
 * `CharacterStringValue ::= RestrictedCharacterStringValue | UnrestrictedCharacterStringValue`
 */
export const CharacterStringValue: Parser = recursiveParser(
  (): Parser =>
    choiceOf(
      [
        parserFor.RestrictedCharacterStringValue,
        parserFor.UnrestrictedCharacterStringValue,
      ],
      ProductionType.CharacterStringValue
    )
);
export default CharacterStringValue;
