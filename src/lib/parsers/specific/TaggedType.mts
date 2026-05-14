import {
  anything,
  assert,
  choiceOf,
  literal,
  optional,
  recursiveParser,
  whitespaceTolerantSequenceOf,
} from '../generic/index.js';
import * as parserFor from '../specific/index.js';
import type Parser from '../../Parser.js';
import ProductionType from '../../ProductionType.js';

/**
 * `TaggedType ::= Tag Type | Tag IMPLICIT Type | Tag EXPLICIT Type`
 */
export default recursiveParser(
  (): Parser =>
    whitespaceTolerantSequenceOf(ProductionType.TaggedType, [
      parserFor.Tag,
      optional(
        choiceOf([
          literal(ProductionType._IMPLICIT),
          literal(ProductionType._EXPLICIT),
        ])
      ),
      assert(parserFor.Type, anything, '65400B3E-ED44-4112-9C14-6B6BC7C5BC3F'),
    ])
);
