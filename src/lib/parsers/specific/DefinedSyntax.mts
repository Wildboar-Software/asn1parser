import {
  literal,
  optional,
  recursiveParser,
  whitespaceOptionalDelimitedList,
  whitespaceTolerantSequenceOf,
} from '../generic/index.mjs';
import * as parserFor from '../specific/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';

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
