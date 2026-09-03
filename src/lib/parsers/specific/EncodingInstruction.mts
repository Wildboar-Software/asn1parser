import { anythingUntil, literal, recursiveParser } from '../generic/index.mjs';
import type Parser from '../../Parser.mjs';
import { ProductionType } from '../../ProductionType.mjs';

/**
 * The `EncodingInstruction` is defined (non-exclusively) in ITU Recommendation
 * X.680 2015, Section 31.3.2. It "can consist of any sequence of ASN.1 lexical
 * items."
 *
 * This reads tokens until `]`, which is left for `EncodingPrefix` to consume.
 * If `]` never appears, the parser fails rather than succeeding at end of input.
 */
export const EncodingInstruction: Parser = recursiveParser(
  (): Parser =>
    anythingUntil(
      ProductionType.EncodingInstruction,
      literal(ProductionType.squareClosing)
    )
);
export default EncodingInstruction;
