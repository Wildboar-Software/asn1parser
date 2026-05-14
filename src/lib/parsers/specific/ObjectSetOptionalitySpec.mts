import {
  assert,
  aliasFor,
  choiceOf,
  literal,
  recursiveParser,
  whitespaceTolerantSequenceOf,
} from '../generic/index.mjs';
import * as parserFor from '../specific/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';

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
