import {
  literal,
  recursiveParser,
  whitespaceOptionalDelimitedList,
  whitespaceTolerantSequenceOf,
} from '../generic/index.mjs';
import * as parserFor from '../specific/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';

/**
 * `OptionalGroup ::= "[" TokenOrGroupSpec empty + "]"`
 */
export const OptionalGroup: Parser = recursiveParser(
  (): Parser =>
    whitespaceTolerantSequenceOf(ProductionType.OptionalGroup, [
      literal(ProductionType.squareOpening),
      whitespaceOptionalDelimitedList(
        ProductionType.TokenOrGroupSpec,
        parserFor.TokenOrGroupSpec
      ),
      literal(ProductionType.squareClosing),
    ])
);
export default OptionalGroup;
