import { choiceOf, literal, recursiveParser } from '../generic/index.js';
import * as parserFor from '../specific/index.js';
import type Parser from '../../Parser.js';
import ProductionType from '../../ProductionType.js';

/**
 * `ClassNumber ::= number | DefinedValue`
 */
export default recursiveParser(
  (): Parser =>
    choiceOf(
      [literal(ProductionType.number), parserFor.DefinedValue],
      ProductionType.ClassNumber
    )
);
