import { choiceOf, literal, recursiveParser } from '../generic/index.mjs';
import * as parserFor from '../specific/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';

/**
 * `EnumerationItem ::= identifier | NamedNumber`
 */
export const EnumerationItem: Parser = recursiveParser(
  (): Parser =>
    choiceOf(
      [parserFor.NamedNumber, literal(ProductionType.identifier)],
      ProductionType.EnumerationItem
    )
);
export default EnumerationItem;
