import { choiceOf, recursiveParser } from '../generic/index.js';
import * as parserFor from '../specific/index.js';
import type Parser from '../../Parser.js';
import ProductionType from '../../ProductionType.js';

/**
 * `SimpleDefinedValue ::= ExternalValueReference | valuereference`
 */
export default recursiveParser(
  (): Parser =>
    choiceOf(
      [parserFor.ExternalValueReference, parserFor.valuereference],
      ProductionType.SimpleDefinedValue
    )
);
