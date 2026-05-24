import {
  aliasFor,
  assert,
  choiceOf,
  literal,
  recursiveParser,
  whitespaceTolerantSequenceOf,
} from '../generic/index.mjs';
import * as parserFor from '../specific/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';

/**
 * `ValueSetOptionalitySpec ::= OPTIONAL | DEFAULT ValueSet`
 */
export const ValueSetOptionalitySpec: Parser = recursiveParser(
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
export default ValueSetOptionalitySpec;
