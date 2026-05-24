import { choiceOf, recursiveParser } from '../generic/index.mjs';
import * as parserFor from '../specific/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';
import * as optimizedParserFor from '../optimized/index.mjs';

/**
 * `DefinedSyntaxToken ::= Literal | Setting`
 */
export const DefinedSyntaxToken: Parser = recursiveParser(
  (): Parser =>
    choiceOf(
      [
        optimizedParserFor.Literal,
        optimizedParserFor.Setting,
        parserFor.Literal, // Left here, just in case.
      ],
      ProductionType.DefinedSyntaxToken
    )
);
export default DefinedSyntaxToken;
