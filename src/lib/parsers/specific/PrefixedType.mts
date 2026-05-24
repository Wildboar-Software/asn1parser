import { choiceOf, recursiveParser } from '../generic/index.mjs';
import * as parserFor from '../specific/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';

/**
 * `PrefixedType ::= TaggedType | EncodingPrefixedType`
 */
export const PrefixedType: Parser = recursiveParser(
  (): Parser =>
    choiceOf(
      [parserFor.TaggedType, parserFor.EncodingPrefixedType],
      ProductionType.PrefixedType
    )
);
export default PrefixedType;
