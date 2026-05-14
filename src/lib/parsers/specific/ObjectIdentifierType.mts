import {
  anything,
  assert,
  literal,
  recursiveParser,
  whitespaceTolerantSequenceOf,
} from '../generic/index.js';
import type Parser from '../../Parser.js';
import ProductionType from '../../ProductionType.js';

/**
 * `ObjectIdentifierType ::= OBJECT IDENTIFIER`
 */
export default recursiveParser(
  (): Parser =>
    whitespaceTolerantSequenceOf(ProductionType.ObjectIdentifierType, [
      literal(ProductionType._OBJECT),
      assert(
        literal(ProductionType._IDENTIFIER),
        anything,
        'B5B862EF-2106-495E-9F81-B4BA7D6C717A'
      ),
    ])
);
