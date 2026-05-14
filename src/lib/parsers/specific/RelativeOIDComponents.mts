import { choiceOf, recursiveParser } from '../generic/index.mjs';
import * as parserFor from '../specific/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';

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
