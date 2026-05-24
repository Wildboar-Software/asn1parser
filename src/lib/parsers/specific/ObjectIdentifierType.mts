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
 * `ObjectIdentifierType ::= OBJECT IDENTIFIER`
 */
export const ObjectIdentifierType: Parser = recursiveParser(
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
export default ObjectIdentifierType;
