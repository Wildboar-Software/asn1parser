import { choiceOf, recursiveParser } from '../generic/index.mjs';
import * as parserFor from '../specific/index.mjs';
import type Parser from '../../Parser.mjs';
import { ProductionType } from '../../ProductionType.mjs';

/**
 * `RelativeOIDComponents ::= NumberForm | NameAndNumberForm | DefinedValue`
 *
 * `NameAndNumberForm` must precede `NumberForm`. `NumberForm` includes
 * `DefinedValue`, which accepts a bare identifier, so `iEF(1)` would
 * otherwise stop after `iEF` and leave `(1)` unparsed.
 */
export const RelativeOIDComponents: Parser = recursiveParser(
  (): Parser =>
    choiceOf(
      [
        parserFor.NameAndNumberForm,
        parserFor.NumberForm,
        parserFor.DefinedValue,
      ],
      ProductionType.RelativeOIDComponents
    )
);
export default RelativeOIDComponents;
