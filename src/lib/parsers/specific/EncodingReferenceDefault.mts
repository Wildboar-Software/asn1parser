import {
  assert,
  literal,
  optional,
  recursiveParser,
  whitespaceTolerantSequenceOf,
} from '../generic/index.mjs';
import * as parserFor from '../specific/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';

/**
 * `EncodingReferenceDefault ::= encodingreference INSTRUCTIONS | empty`
 */
export const EncodingReferenceDefault: Parser = recursiveParser(
  (): Parser =>
    optional(
      whitespaceTolerantSequenceOf(ProductionType.EncodingReferenceDefault, [
        parserFor.encodingreference,
        assert(
          literal(ProductionType._INSTRUCTIONS),
          parserFor.TagDefault,
          '12AC2295-8418-4043-B175-9DC1C1148B46'
        ),
      ])
    )
);
export default EncodingReferenceDefault;
