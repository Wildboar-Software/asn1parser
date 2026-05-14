import { type CharacterStringList } from  '../CharacterStringList.mjs';
import type Quadruple from  '../Quadruple.mjs';
import type Tuple from  '../Tuple.mjs';

/**
 * `RestrictedCharacterStringValue ::= cstring | CharacterStringList | Quadruple | Tuple`
 */
export type RestrictedCharacterStringValue =
  | string
  | CharacterStringList
  | Quadruple
  | Tuple;
