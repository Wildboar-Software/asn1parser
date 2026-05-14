import {
  anything,
  assert,
  literal,
  recursiveParser,
  whitespaceTolerantSequenceOf,
} from '../generic/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';

/**
 * `UnrestrictedCharacterStringType ::= CHARACTER STRING`
 */
export default recursiveParser(
  (): Parser =>
    whitespaceTolerantSequenceOf(
      ProductionType.UnrestrictedCharacterStringType,
      [
        literal(ProductionType._CHARACTER),
        assert(
          literal(ProductionType._STRING),
          anything,
          '5D836D8A-9112-4AD4-80C4-FD3E89518038'
        ),
      ]
    )
);
