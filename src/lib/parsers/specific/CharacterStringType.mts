import {
  dispatchOnToken,
  recursiveParser,
  RESTRICTED_CHARACTER_STRING_TYPES,
} from '../generic/index.mjs';
import type { TokenParserTable } from '../generic/dispatchOnToken.mjs';
import { tokenParserTable } from '../generic/dispatchOnToken.mjs';
import * as parserFor from '../specific/index.mjs';
import type Parser from '../../Parser.mjs';
import { ProductionType } from '../../ProductionType.mjs';

/**
 * `CharacterStringType ::= RestrictedCharacterStringType | UnrestrictedCharacterStringType`
 */
export const CharacterStringType: Parser = recursiveParser((): Parser => {
  const table: TokenParserTable = tokenParserTable([
    [ProductionType._CHARACTER, parserFor.UnrestrictedCharacterStringType],
  ]);
  for (const type of RESTRICTED_CHARACTER_STRING_TYPES) {
    table.set(type, parserFor.RestrictedCharacterStringType);
  }
  return dispatchOnToken(table, ProductionType.CharacterStringType);
});
export default CharacterStringType;
