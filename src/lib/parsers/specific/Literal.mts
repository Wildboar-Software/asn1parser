import { choiceOf, literal, recursiveParser } from '../generic/index.mjs';
import * as parserFor from '../specific/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';

/**
 * `Literal ::= word | ","`
 */
export default recursiveParser(
  (): Parser =>
    choiceOf(
      [parserFor.word, literal(ProductionType.comma)],
      ProductionType.Literal
    )
);
