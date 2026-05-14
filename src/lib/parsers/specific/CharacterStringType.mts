import { choiceOf, recursiveParser } from '../generic/index.mjs';
import * as parserFor from '../specific/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';

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
