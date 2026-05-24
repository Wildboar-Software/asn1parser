import {
  assert,
  choiceOf,
  literal,
  optional,
  recursiveParser,
  whitespaceTolerantSequenceOf,
} from '../generic/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';

/**
 * `TagDefault ::=
 *     EXPLICIT TAGS
 *     | IMPLICIT TAGS
 *     | AUTOMATIC TAGS
 *     | empty`
 */
export const TagDefault: Parser = recursiveParser(
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
export default TagDefault;
