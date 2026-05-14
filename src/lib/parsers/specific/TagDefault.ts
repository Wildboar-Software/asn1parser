import {
  assert,
  choiceOf,
  literal,
  optional,
  recursiveParser,
  whitespaceTolerantSequenceOf,
} from '../generic/index.js';
import type Parser from '../../Parser.js';
import ProductionType from '../../ProductionType.js';

/**
 * `TagDefault ::=
 *     EXPLICIT TAGS
 *     | IMPLICIT TAGS
 *     | AUTOMATIC TAGS
 *     | empty`
 */
export default recursiveParser(
  (): Parser =>
    optional(
      whitespaceTolerantSequenceOf(ProductionType.TagDefault, [
        choiceOf([
          literal(ProductionType._EXPLICIT),
          literal(ProductionType._IMPLICIT),
          literal(ProductionType._AUTOMATIC),
        ]),
        assert(
          literal(ProductionType._TAGS),
          literal(ProductionType.assignment),
          'A56584FB-14D5-4076-8251-6CA05403E227'
        ),
      ])
    )
);
