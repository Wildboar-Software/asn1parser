import { choiceOf, recursiveParser } from '../generic/index.js';
import * as parserFor from '../specific/index.js';
import type Parser from '../../Parser.js';
import ProductionType from '../../ProductionType.js';
import * as optimizedParserFor from '../optimized/index.js';

/**
 * `DefinedSyntaxToken ::= Literal | Setting`
 */
export default recursiveParser(
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
