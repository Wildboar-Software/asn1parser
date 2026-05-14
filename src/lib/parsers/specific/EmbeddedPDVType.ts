import {
  assert,
  literal,
  recursiveParser,
  whitespace,
  whitespaceTolerantSequenceOf,
} from '../generic/index.js';
import type Parser from '../../Parser.js';
import ProductionType from '../../ProductionType.js';

/**
 * `EmbeddedPDVType ::= EMBEDDED PDV`
 */
export default recursiveParser(
  (): Parser =>
    whitespaceTolerantSequenceOf(ProductionType.EmbeddedPDVType, [
      literal(ProductionType._EMBEDDED),
      assert(
        literal(ProductionType._PDV),
        whitespace,
        '1CC1F612-DA7B-4EBD-ABF8-8E19A23CB743'
      ),
    ])
);
