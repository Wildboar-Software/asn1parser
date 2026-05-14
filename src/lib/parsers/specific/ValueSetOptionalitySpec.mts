import {
  aliasFor,
  assert,
  choiceOf,
  literal,
  recursiveParser,
  whitespaceTolerantSequenceOf,
} from '../generic/index.js';
import * as parserFor from '../specific/index.js';
import type Parser from '../../Parser.js';
import ProductionType from '../../ProductionType.js';

/**
 * `ValueSetOptionalitySpec ::= OPTIONAL | DEFAULT ValueSet`
 */
export default recursiveParser(
  (): Parser =>
    choiceOf([
      aliasFor(
        ProductionType.ValueSetOptionalitySpec,
        literal(ProductionType._OPTIONAL)
      ),
      whitespaceTolerantSequenceOf(ProductionType.ValueSetOptionalitySpec, [
        literal(ProductionType._DEFAULT),
        assert(
          parserFor.ValueSet,
          choiceOf([
            literal(ProductionType.comma),
            literal(ProductionType.curlyClosing),
          ]),
          '7A0865BB-5A10-4103-BEA9-40ABA4912314'
        ),
      ]),
    ])
);
