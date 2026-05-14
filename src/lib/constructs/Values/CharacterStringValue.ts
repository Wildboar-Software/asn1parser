import { type RestrictedCharacterStringValue } from './RestrictedCharacterStringValue.js';
import { type UnrestrictedCharacterStringValue } from './UnrestrictedCharacterStringValue.js';

/**
 * `CharacterStringValue ::= RestrictedCharacterStringValue | UnrestrictedCharacterStringValue`
 */
export type CharacterStringValue =
  | RestrictedCharacterStringValue
  | UnrestrictedCharacterStringValue;
