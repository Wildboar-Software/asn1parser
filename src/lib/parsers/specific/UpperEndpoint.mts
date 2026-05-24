import {
  aliasFor,
  anything,
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
 * `UpperEndpoint ::= UpperEndValue | "<" UpperEndValue`
 */
export const UpperEndpoint: Parser = recursiveParser(
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
export default UpperEndpoint;
