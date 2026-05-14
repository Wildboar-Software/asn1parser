import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';
import { choiceOf, recursiveParser } from '../generic/index.mjs';
import * as parserFor from '../specific/index.mjs';

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
