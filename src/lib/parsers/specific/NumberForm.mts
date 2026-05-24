import { choiceOf, literal, recursiveParser } from '../generic/index.mjs';
import * as parserFor from '../specific/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';

/**
 * `NumberForm ::= number | DefinedValue`
 */
export const NumberForm: Parser = recursiveParser(
  (): Parser =>
    choiceOf(
      [literal(ProductionType.number), parserFor.DefinedValue],
      ProductionType.NumberForm
    )
);
export default NumberForm;
