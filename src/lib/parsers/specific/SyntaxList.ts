import {
  literal,
  recursiveParser,
  whitespaceOptionalDelimitedList,
  whitespaceTolerantSequenceOf,
} from '../generic/index.js';
import * as parserFor from '../specific/index.js';
import type Parser from '../../Parser.js';
import ProductionType from '../../ProductionType.js';

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
      ), // FIXME:
      literal(ProductionType.curlyClosing),
    ])
);
