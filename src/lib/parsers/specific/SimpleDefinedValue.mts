import { choiceOf, recursiveParser } from '../generic/index.mjs';
import * as parserFor from '../specific/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';

/**
 * `SimpleDefinedValue ::= ExternalValueReference | valuereference`
 */
export const SimpleDefinedValue: Parser = recursiveParser(
  (): Parser =>
    choiceOf(
      [parserFor.ExternalValueReference, parserFor.valuereference],
      ProductionType.SimpleDefinedValue
    )
);
export default SimpleDefinedValue;
