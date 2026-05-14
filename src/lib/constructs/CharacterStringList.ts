import { type CharsDefn } from './CharsDefn.js';

/**
 * `CharacterStringList ::= "{" CharSyms "}"`
 *
 * `CharSyms ::= CharsDefn | CharSyms "," CharsDefn`
 */
export type CharacterStringList = CharsDefn[];
