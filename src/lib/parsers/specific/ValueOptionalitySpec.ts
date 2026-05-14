import {
  assert,
  choiceOf,
  literal,
  recursiveParser,
  aliasFor,
  whitespaceTolerantSequenceOf,
} from '../generic/index.js';
import * as parserFor from '../specific/index.js';
import type Parser from '../../Parser.js';
import ProductionType from '../../ProductionType.js';

/**
 * `ValueOptionalitySpec ::= OPTIONAL | DEFAULT Value`
 */
export default recursiveParser(
  (): Parser =>
    choiceOf([
      aliasFor(
        ProductionType.ValueOptionalitySpec,
        literal(ProductionType._OPTIONAL)
      ),
      whitespaceTolerantSequenceOf(ProductionType.ValueOptionalitySpec, [
        literal(ProductionType._DEFAULT),
        assert(
          parserFor.Value,
          choiceOf([
            literal(ProductionType.comma),
            literal(ProductionType.curlyClosing),
          ]),
          '9AA9AFF9-214D-4800-B191-3CF7F631615E'
        ),
      ]),
    ])
);
