import {
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
 * `LowerEndpoint ::= LowerEndValue | LowerEndValue "<"`
 */
export const LowerEndpoint: Parser = recursiveParser(
  (): Parser =>
    choiceOf([
      whitespaceTolerantSequenceOf(ProductionType.LowerEndpoint, [
        parserFor.LowerEndValue,
        literal(ProductionType.lessThan),
      ]),
      aliasFor(ProductionType.LowerEndpoint, parserFor.LowerEndValue),
    ])
);
export default LowerEndpoint;
