import {
  choiceOf,
  recursiveParser,
  whitespaceTolerantSequenceOf,
} from '../generic/index.mjs';
import * as parserFor from '../specific/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';

/**
 * `FixedTypeValueSetFieldSpec ::= valuesetfieldreference Type ValueSetOptionalitySpec ?`
 */
export default recursiveParser(
  (): Parser =>
    choiceOf([
      whitespaceTolerantSequenceOf(ProductionType.FixedTypeValueSetFieldSpec, [
        parserFor.valuesetfieldreference,
        parserFor.Type,
        parserFor.ValueSetOptionalitySpec,
      ]),
      whitespaceTolerantSequenceOf(ProductionType.FixedTypeValueSetFieldSpec, [
        parserFor.valuesetfieldreference,
        parserFor.Type,
      ]),
    ])
);
