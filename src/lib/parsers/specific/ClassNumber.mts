import { choiceOf, literal, recursiveParser } from '../generic/index.mjs';
import * as parserFor from '../specific/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';

/**
 * `ClassNumber ::= number | DefinedValue`
 */
export const ClassNumber: Parser = recursiveParser(
  (): Parser =>
    choiceOf(
      [literal(ProductionType.number), parserFor.DefinedValue],
      ProductionType.ClassNumber
    )
);
export default ClassNumber;
