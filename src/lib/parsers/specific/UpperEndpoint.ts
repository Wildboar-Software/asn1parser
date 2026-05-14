import {
  aliasFor,
  anything,
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
 * `UpperEndpoint ::= UpperEndValue | "<" UpperEndValue`
 */
export default recursiveParser(
  (): Parser =>
    choiceOf([
      whitespaceTolerantSequenceOf(ProductionType.UpperEndpoint, [
        literal(ProductionType.lessThan),
        assert(
          parserFor.UpperEndValue,
          anything,
          'FA0422E4-4D59-4D4F-B2D6-04D6B72B07C2'
        ),
      ]),
      aliasFor(ProductionType.UpperEndpoint, parserFor.UpperEndValue),
    ])
);
