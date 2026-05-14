import * as parserFor from '../specific/index.js';
import type Parser from '../../Parser.js';
import ProductionType from '../../ProductionType.js';
import { choiceOf, recursiveParser } from '../generic/index.js';

/**
 * `DefinitiveObjIdComponent ::=
 *     NameForm
 *     | DefinitiveNumberForm
 *     | DefinitiveNameAndNumberForm`
 */
export default recursiveParser(
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
