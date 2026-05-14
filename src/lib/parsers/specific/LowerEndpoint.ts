import {
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
 * `LowerEndpoint ::= LowerEndValue | LowerEndValue "<"`
 */
export default recursiveParser(
  (): Parser =>
    choiceOf([
      whitespaceTolerantSequenceOf(ProductionType.LowerEndpoint, [
        parserFor.LowerEndValue,
        literal(ProductionType.lessThan),
      ]),
      aliasFor(ProductionType.LowerEndpoint, parserFor.LowerEndValue),
    ])
);
