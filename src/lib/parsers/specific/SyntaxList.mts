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
 * `SyntaxList ::= "{" TokenOrGroupSpec empty + "}"`
 */
export default recursiveParser(
  (): Parser =>
    whitespaceTolerantSequenceOf(ProductionType.SyntaxList, [
      literal(ProductionType.curlyOpening),
      whitespaceOptionalDelimitedList(
        ProductionType.TokenOrGroupSpec,
        parserFor.TokenOrGroupSpec
      ),
      literal(ProductionType.curlyClosing),
    ])
);
