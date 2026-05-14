import { choiceOf, recursiveParser } from '../generic/index.js';
import * as parserFor from '../specific/index.js';
import type Parser from '../../Parser.js';
import ProductionType from '../../ProductionType.js';

/**
 * `PrefixedType ::= TaggedType | EncodingPrefixedType`
 */
export default recursiveParser(
  (): Parser =>
    choiceOf(
      [parserFor.TaggedType, parserFor.EncodingPrefixedType],
      ProductionType.PrefixedType
    )
);
