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
 * `OctetStringType ::= OCTET STRING`
 */
export default recursiveParser(
  (): Parser =>
    whitespaceTolerantSequenceOf(ProductionType.OctetStringType, [
      literal(ProductionType._OCTET),
      assert(
        literal(ProductionType._STRING),
        anything,
        '811EEF4D-9BFB-41E8-B69A-AB60A6FFF56B'
      ),
    ])
);
