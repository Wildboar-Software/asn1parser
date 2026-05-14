import {
  choiceOf,
  recursiveParser,
  whitespaceTolerantSequenceOf,
} from '../generic/index.js';
import * as parserFor from '../specific/index.js';
import type Parser from '../../Parser.js';
import ProductionType from '../../ProductionType.js';

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
