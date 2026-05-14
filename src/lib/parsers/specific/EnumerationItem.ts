import { choiceOf, literal, recursiveParser } from '../generic/index.js';
import * as parserFor from '../specific/index.js';
import type Parser from '../../Parser.js';
import ProductionType from '../../ProductionType.js';

/**
 * `EnumerationItem ::= identifier | NamedNumber`
 */
export default recursiveParser(
  (): Parser =>
    choiceOf(
      [parserFor.NamedNumber, literal(ProductionType.identifier)],
      ProductionType.EnumerationItem
    )
);
