import { choiceOf, literal, recursiveParser } from '../generic/index.js';
// import * as parserFor from '../specific/index.js';
import type Parser from '../../Parser.js';
import ProductionType from '../../ProductionType.js';

/**
 * `RestrictedCharacterStringValue ::= cstring | CharacterStringList | Quadruple | Tuple`
 */
export default recursiveParser(
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
