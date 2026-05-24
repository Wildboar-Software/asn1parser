import {
  assert,
  literal,
  recursiveParser,
  whitespace,
  whitespaceTolerantSequenceOf,
} from '../generic/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';

/**
 * `EmbeddedPDVType ::= EMBEDDED PDV`
 */
export const EmbeddedPDVType: Parser = recursiveParser(
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
export default EmbeddedPDVType;
