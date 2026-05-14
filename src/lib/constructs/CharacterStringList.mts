import { type CharsDefn } from './CharsDefn.mjs';

/**
 * `CharacterStringList ::= "{" CharSyms "}"`
 *
 * `CharSyms ::= CharsDefn | CharSyms "," CharsDefn`
 */
export type CharacterStringList = CharsDefn[];
