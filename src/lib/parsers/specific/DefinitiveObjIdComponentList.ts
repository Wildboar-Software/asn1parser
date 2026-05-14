import * as parserFor from '../specific/index.js';
import type Parser from '../../Parser.js';
import ProductionType from '../../ProductionType.js';
import {
  recursiveParser,
  whitespaceOptionalDelimitedList,
} from '../generic/index.js';

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
