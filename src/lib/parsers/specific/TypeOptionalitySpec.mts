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
