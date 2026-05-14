import {
  assert,
  aliasFor,
  choiceOf,
  literal,
  recursiveParser,
  whitespaceTolerantSequenceOf,
} from '../generic/index.js';
import * as parserFor from '../specific/index.js';
import type Parser from '../../Parser.js';
import ProductionType from '../../ProductionType.js';

/**
 * `ObjectSetOptionalitySpec ::= OPTIONAL | DEFAULT ObjectSet`
 */
export default recursiveParser(
  (): Parser =>
    choiceOf([
      aliasFor(
        ProductionType.ObjectSetOptionalitySpec,
        literal(ProductionType._OPTIONAL)
      ),
      whitespaceTolerantSequenceOf(ProductionType.ObjectSetOptionalitySpec, [
        literal(ProductionType._DEFAULT),
        assert(
          parserFor.ObjectSet,
          choiceOf([
            literal(ProductionType.comma),
            literal(ProductionType.curlyClosing),
          ]),
          'C2C58145-3479-4543-A715-25A19FD53148'
        ),
      ]),
    ])
);
