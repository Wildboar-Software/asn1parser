import {
  recursiveParser,
  whitespaceTolerantSequenceOf,
} from '../generic/index.mjs';
import * as parserFor from '../specific/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';

/**
 * `EncodingPrefixedType ::= EncodingPrefix Type`
 */
export const EncodingPrefixedType: Parser = recursiveParser(
  (): Parser =>
    whitespaceTolerantSequenceOf(ProductionType.EncodingPrefixedType, [
      parserFor.EncodingPrefix,
      parserFor.Type,
    ])
);
export default EncodingPrefixedType;
