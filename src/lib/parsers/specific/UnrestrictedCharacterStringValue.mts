import { aliasFor, recursiveParser } from '../generic/index.mjs';
import * as parserFor from '../specific/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';

/**
 * `UnrestrictedCharacterStringValue ::= SequenceValue`
 */
export const UnrestrictedCharacterStringValue: Parser = recursiveParser(
  (): Parser =>
    aliasFor(
      ProductionType.UnrestrictedCharacterStringValue,
      parserFor.SequenceValue
    )
);
export default UnrestrictedCharacterStringValue;
