import { type RestrictedCharacterStringValue } from './RestrictedCharacterStringValue.mjs';
import { type UnrestrictedCharacterStringValue } from './UnrestrictedCharacterStringValue.mjs';

/**
 * `CharacterStringValue ::= RestrictedCharacterStringValue | UnrestrictedCharacterStringValue`
 */
export type CharacterStringValue =
  | RestrictedCharacterStringValue
  | UnrestrictedCharacterStringValue;
