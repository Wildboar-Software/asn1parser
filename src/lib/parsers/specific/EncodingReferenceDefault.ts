import {
  assert,
  literal,
  optional,
  recursiveParser,
  whitespaceTolerantSequenceOf,
} from '../generic/index.js';
import * as parserFor from '../specific/index.js';
import type Parser from '../../Parser.js';
import ProductionType from '../../ProductionType.js';

/**
 * `EncodingReferenceDefault ::= encodingreference INSTRUCTIONS | empty`
 */
export default recursiveParser(
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
