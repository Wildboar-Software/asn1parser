import { anythingUntil, literal, recursiveParser } from '../generic/index.js';
import type Parser from '../../Parser.js';
import ProductionType from '../../ProductionType.js';

/**
 * The `EncodingInstruction` is defined (non-exclusively) in ITU Recommendation
 * X.680 2015, Section 31.3.2. It "can consist of any sequence of ASN.1 lexical
 * items."
 */
export default recursiveParser(
  (): Parser =>
    anythingUntil(
      ProductionType.EncodingInstruction,
      literal(ProductionType.squareClosing)
    )
);
