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
 * `TypeOptionalitySpec ::= OPTIONAL | DEFAULT Type`
 */
export default recursiveParser(
  (): Parser =>
    choiceOf([
      aliasFor(
        ProductionType.TypeOptionalitySpec,
        literal(ProductionType._OPTIONAL)
      ),
      whitespaceTolerantSequenceOf(ProductionType.TypeOptionalitySpec, [
        literal(ProductionType._DEFAULT),
        assert(
          parserFor.Type,
          choiceOf([
            literal(ProductionType.comma),
            literal(ProductionType.curlyClosing),
          ]),
          'AAE17060-4228-4958-96EE-821D1207025D'
        ),
      ]),
    ])
);
