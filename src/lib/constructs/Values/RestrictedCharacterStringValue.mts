import { type CharacterStringList } from  '../CharacterStringList.js';
import type Quadruple from  '../Quadruple.js';
import type Tuple from  '../Tuple.js';

/**
 * `RestrictedCharacterStringValue ::= cstring | CharacterStringList | Quadruple | Tuple`
 */
export type RestrictedCharacterStringValue =
  | string
  | CharacterStringList
  | Quadruple
  | Tuple;
