import {
  literal,
  optional,
  recursiveParser,
  whitespaceOptionalDelimitedList,
  whitespaceTolerantSequenceOf,
} from '../generic/index.js';
import * as parserFor from '../specific/index.js';
import type Parser from '../../Parser.js';
import ProductionType from '../../ProductionType.js';

/**
 * `DefinedSyntax ::= "{" DefinedSyntaxToken empty * "}"`
 */
export default recursiveParser(
  (): Parser =>
    whitespaceTolerantSequenceOf(ProductionType.DefinedSyntax, [
      literal(ProductionType.curlyOpening),
      optional(
        whitespaceOptionalDelimitedList(
          ProductionType.DefinedSyntaxToken,
          parserFor.DefinedSyntaxToken
        )
      ),
      literal(ProductionType.curlyClosing),
    ])
);
