import { choiceOf, recursiveParser } from '../generic/index.js';
import * as parserFor from '../specific/index.js';
import type Parser from '../../Parser.js';
import ProductionType from '../../ProductionType.js';

/**
 * `CharacterStringType ::= RestrictedCharacterStringType | UnrestrictedCharacterStringType`
 */
export default recursiveParser(
  (): Parser =>
    choiceOf(
      [
        parserFor.RestrictedCharacterStringType,
        parserFor.UnrestrictedCharacterStringType,
      ],
      ProductionType.CharacterStringType
    )
);
