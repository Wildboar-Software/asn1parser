import { choiceOf, literal, recursiveParser } from '../generic/index.mjs';
// import * as parserFor from '../specific/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';

/**
 * `RestrictedCharacterStringValue ::= cstring | CharacterStringList | Quadruple | Tuple`
 */
export const RestrictedCharacterStringValue: Parser = recursiveParser(
  (): Parser =>
    choiceOf(
      [
        literal(ProductionType.cstring),
        /* TODO: I disabled these. They are rarely used, but frequently get
        mixed up with `SEQUENCE OF UTF8String`, such as is used by the
        `ldapName` setting of an X.500 `ATTRIBUTE` information object. */
        // parserFor.CharacterStringList,
        // parserFor.Quadruple,
        // parserFor.Tuple,
      ],
      ProductionType.RestrictedCharacterStringValue
    )
);
export default RestrictedCharacterStringValue;
