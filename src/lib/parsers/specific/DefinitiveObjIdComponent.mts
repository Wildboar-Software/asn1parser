import * as parserFor from '../specific/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';
import { choiceOf, recursiveParser } from '../generic/index.mjs';

/**
 * `DefinitiveObjIdComponent ::=
 *     NameForm
 *     | DefinitiveNumberForm
 *     | DefinitiveNameAndNumberForm`
 */
export const DefinitiveObjIdComponent: Parser = recursiveParser(
  (): Parser =>
    choiceOf(
      [
        parserFor.DefinitiveNameAndNumberForm,
        parserFor.NameForm,
        parserFor.DefinitiveNumberForm,
      ],
      ProductionType.DefinitiveObjIdComponent
    )
);
export default DefinitiveObjIdComponent;
