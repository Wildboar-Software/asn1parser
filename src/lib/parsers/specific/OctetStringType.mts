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
 * `OctetStringType ::= OCTET STRING`
 */
export const OctetStringType: Parser = recursiveParser(
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
export default OctetStringType;
