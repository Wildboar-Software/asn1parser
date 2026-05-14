import * as parserFor from '../specific/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';
import {
  recursiveParser,
  whitespaceOptionalDelimitedList,
} from '../generic/index.mjs';

/**
 * `DefinitiveObjIdComponentList ::=
 *      DefinitiveObjIdComponent
 *      | DefinitiveObjIdComponent DefinitiveObjIdComponentList`
 */
export default recursiveParser(
  (): Parser =>
    whitespaceOptionalDelimitedList(
      ProductionType.DefinitiveObjIdComponentList,
      parserFor.DefinitiveObjIdComponent
    )
);
