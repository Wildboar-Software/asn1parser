import { choiceOf, literal, recursiveParser } from '../generic/index.js';
import * as parserFor from '../specific/index.js';
import type Parser from '../../Parser.js';
import ProductionType from '../../ProductionType.js';

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
