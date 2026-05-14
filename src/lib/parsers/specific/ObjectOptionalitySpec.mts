import {
  assert,
  choiceOf,
  literal,
  recursiveParser,
  aliasFor,
  whitespaceTolerantSequenceOf,
} from '../generic/index.mjs';
import * as parserFor from '../specific/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';

/**
 * `ObjectOptionalitySpec ::= OPTIONAL | DEFAULT Object`
 */
export default recursiveParser(
  (): Parser =>
    choiceOf([
      aliasFor(
        ProductionType.ObjectOptionalitySpec,
        literal(ProductionType._OPTIONAL)
      ),
      whitespaceTolerantSequenceOf(ProductionType.ObjectOptionalitySpec, [
        literal(ProductionType._DEFAULT),
        assert(
          parserFor.Object,
          choiceOf([
            literal(ProductionType.comma),
            literal(ProductionType.curlyClosing),
          ]),
          '3182D7FD-860B-4743-A83A-BC7E07032B42'
        ),
      ]),
    ])
);
