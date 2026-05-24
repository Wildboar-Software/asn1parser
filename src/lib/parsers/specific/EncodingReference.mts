import {
  literal,
  optional,
  recursiveParser,
  whitespaceTolerantSequenceOf,
} from '../generic/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';
import * as parserFor from './index.mjs';

/**
 * `EncodingReference ::= encodingreference ":" | empty`
 */
export const EncodingReference: Parser = recursiveParser(
  (): Parser =>
    optional(
      whitespaceTolerantSequenceOf(ProductionType.EncodingReference, [
        parserFor.encodingreference,
        literal(ProductionType.colon),
      ])
    )
);
export default EncodingReference;
