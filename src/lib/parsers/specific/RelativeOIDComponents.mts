import { choiceOf, recursiveParser } from '../generic/index.js';
import * as parserFor from '../specific/index.js';
import type Parser from '../../Parser.js';
import ProductionType from '../../ProductionType.js';

/**
 * `RelativeOIDComponents ::= NumberForm | NameAndNumberForm | DefinedValue`
 */
export default recursiveParser(
  (): Parser =>
    choiceOf(
      [
        parserFor.NumberForm,
        parserFor.NameAndNumberForm,
        parserFor.DefinedValue,
      ],
      ProductionType.RelativeOIDComponents
    )
);
