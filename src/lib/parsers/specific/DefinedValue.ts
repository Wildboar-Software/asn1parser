import type Parser from '../../Parser.js';
import ProductionType from '../../ProductionType.js';
import { choiceOf, recursiveParser } from '../generic/index.js';
import * as parserFor from '../specific/index.js';

/**
 * `DefinedValue ::= ExternalValueReference | valuereference | ParameterizedValue`
 */
export default recursiveParser(
  (): Parser =>
    choiceOf(
      [
        parserFor.ParameterizedValue,
        parserFor.ExternalValueReference,
        parserFor.valuereference,
      ],
      ProductionType.DefinedValue
    )
);
